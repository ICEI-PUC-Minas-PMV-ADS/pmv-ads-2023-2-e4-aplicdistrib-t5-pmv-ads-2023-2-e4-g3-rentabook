import * as React from 'react';
import * as ImagePicker from "expo-image-picker";

import { View, Text, Platform, ScrollView, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { PrimaryGreenColor, WhiteColor } from "../../common/theme/colors";
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { PrivateAddress } from '../../types/PrivateAddress';
import { BookView } from '../../types/BookView';
import { bookService } from '../../services/bookService';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackTypes';
import { announcementsService } from '../../services/announcementsService';
import { CleanAnnouncementView } from '../../types/CleanAnnouncementView';
import { AppParamsList } from '../../routes/AppParamsList';
import { getImageLink } from '../../common/utils/annoucementsUtils';
import { CreateAnnouncementProvider, useCreateAnnouncementContext } from './contexts';
import { useMediaQuery } from '../../hooks/useResposive';
import { useAlertMessage } from '../../contexts/Message';

import Dropdown from "../../common/components/Dropdown";
import TextArea from "../../common/components/TextArea";
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar";
import PrimaryButton from "../../common/components/PrimaryButton";
import SearchInput from "../../common/components/SearchInput";
import DestructiveButton from '../../common/components/DestructiveButton';
import CurrencyInput from '../../common/components/CurrencyInput';
import LazyDropdown from '../../common/components/LazyDropdown';

/**
 * CreateAnnouncementProps
 */

type CreateAnnouncementProps = {};

/**
 * CreateAnnouncement
 */

export function CreateAnnouncement(props: CreateAnnouncementProps) {
  return (
    <CreateAnnouncementProvider>
      <CreateAnnouncementImpl {...props} />
    </CreateAnnouncementProvider>
  );
}

/**
 * CreateAnnouncementImpl
 */

function CreateAnnouncementImpl(props: CreateAnnouncementProps) {
  const navigation = useNavigation<StackTypes>();
  const route = useRoute<RouteProp<AppParamsList, 'Criar Anúncio'>>();
  const announcementId = route.params?.announcementId;
  const auth = React.useContext(AuthContext);
  const { showAlert } = useAlertMessage();
  const { state, dispatch } = useCreateAnnouncementContext();

  React.useEffect(() => {
    if (announcementId) {
      announcementsService.getAnnouncementById(announcementId)
        .then((announcement: CleanAnnouncementView) => {
          dispatch({ type: 'set_announcement', payload: announcement });

          const hasAnnouncementLocation = announcement && announcement.location;
          const hasUserAddress = auth.user && auth.user.addresses;

          if (hasAnnouncementLocation && hasUserAddress) {
            for (let i = 0; i < auth.user!.addresses.length; i++) {
              if (auth.user!.addresses[i]?.id === announcement.location.id) {
                dispatch({ type: 'set_selected_address', payload: auth.user!.addresses[i] });
              }
            }
          }
        });
    }
  }, [announcementId, auth.user?.addresses]);

  React.useEffect(() => {
    if (auth.user && auth.user.addresses) {
      const addresses: PrivateAddress[] = [];
      for (let i in auth.user.addresses) {
        if (auth.user.addresses[i]) {
          addresses.push(auth.user.addresses[i]!!);
        }
      }
      dispatch({ type: 'set_user_addresses', payload: addresses });
    }
  }, [auth.user?.addresses]);

  const handleSearch = React.useCallback((page: number) => {
    if (state.searchTerm) {
      dispatch({ type: 'set_has_more_book_data', payload: true });
      bookService.pageableSearchBook(state.searchTerm, page)
        .then((foundedBooks) => {
          if (foundedBooks.last) { dispatch({ type: 'set_has_more_book_data', payload: false }) }
          dispatch({
            type: 'set_books', payload: {
              books: foundedBooks.content as BookView[],
              nextBooksPage: page + 1,
            }
          });
        });
    }
  }, [state.searchTerm]);

  const handleEndReached = () => {
    if (state.hasMoreBookData) {
      handleSearch(state.nextBooksPage);
    }
  };

  const handleSaveAnnouncement = async () => {

    /**
     * Upload images
     */

    const uploadedImagesResponse: string[] = [];
    if (Platform.OS === 'web') {
      for (let i = 0; i < state.uploadedFiles.length; i++) {
        const formData = new FormData();
        formData.append("image", state.uploadedFiles[i])
        const response = await announcementsService.uploadImage(formData);
        uploadedImagesResponse.push(response.id);
      }
    } else if (Platform.OS === 'android') {
      for (let i = 0; i < state.uploadedFilesMobile.length; i++) {
        const response = await announcementsService.uploadImageMobile(state.uploadedFilesMobile[i]);
        uploadedImagesResponse.push(response.id);
      }
    }

    /**
     * Create/Update announcement
     */

    if (state.announcement) {
      await announcementsService.updateAnnouncement(state.announcement.id, {
        bookId: state.selectedBook!.id,
        images: [...state.announcement.images, ...uploadedImagesResponse],
        description: state.description,
        locationId: state.selectedAddress!!.id!!,
        valueForRent: state.rentValue,
        valueForSale: state.saleValue,
        rent: state.rent,
        trade: state.trade,
        sale: state.sale,
      });
    } else {
      await announcementsService.createAnnouncement({
        bookId: state.selectedBook!!.id!!,
        images: uploadedImagesResponse,
        description: state.description,
        locationId: state.selectedAddress!.id!,
        valueForRent: state.rentValue,
        valueForSale: state.saleValue,
        rent: state.rent,
        trade: state.trade,
        sale: state.sale,
      });
    }

    if (!state.announcement) {
      showAlert('Anuncio criado com sucesso!')
    } else {
      showAlert('Anuncio editado com sucesso!')
    }

    dispatch({ type: 'set_uploaded_files', payload: [] });
    navigation.navigate("Meus Anúncios", { reset: true });
  };

  /**
   * Upload file
   */

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const _uploadedFiles: File[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        _uploadedFiles.push(event.target.files[i]);
      }
      dispatch({ type: 'set_uploaded_files', payload: _uploadedFiles });
    }
  };

  /**
   * Upload file mobile
   */

  const uploadFileMobile = async () => {
    const pickImage = async () => {
      const { status } = await ImagePicker.
        requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        showAlert('O aplicativo não tem permissão para usar a camera.');
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsMultipleSelection: true,
        });

        if (!result.canceled) {
          const _uploadedFiles: ImagePicker.ImagePickerAsset[] = [];
          for (let i = 0; i < result.assets.length; i++) {
            _uploadedFiles.push(result.assets[i]);
          }
          dispatch({ type: 'set_uploaded_files_mobile', payload: _uploadedFiles });
        }
      }
    };

    pickImage();
  };

  const UploadFileInput = React.useMemo(() => {
    if (Platform.OS === 'web') {
      return (
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple={true}
          style={{ display: 'none' }}
          onChange={(evt) => uploadFile(evt)} />
      );
    }
  }, [Platform.OS]);

  return (
    <ResponsiveNavbar>
      <View style={styles.container}>
        {
          useMediaQuery(0, 601) && (
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
              <View style={styles.contentContainerXs}>
                <View style={styles.formXs}>
                  <View>
                    <View>
                      <Text>Escolha o tipo:</Text>
                      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <PrimaryButton
                          label="Venda"
                          style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                          activeStyle={state.sale}
                          onPress={() => dispatch({ type: 'set_sale', payload: !state.sale })} />

                        <View style={{ width: 10 }} />

                        <PrimaryButton
                          label="Troca"
                          style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                          activeStyle={state.trade}
                          onPress={() => dispatch({ type: 'set_trade', payload: !state.trade })} />

                        <View style={{ width: 10 }} />

                        <PrimaryButton
                          label="Aluguel"
                          style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                          activeStyle={state.rent}
                          onPress={() => dispatch({ type: 'set_rent', payload: !state.rent })} />
                      </View>
                    </View>

                    <View style={{ height: 10 }} />

                    <View>
                      <Text>Escolha o livro:</Text>
                      <View style={styles.selectContainer}>
                        <View >
                          <SearchInput
                            onChange={(value) => dispatch({ type: 'set_search_term', payload: value })}
                            placeholder="Pesquisar por livro" />

                          <View style={{ height: 10 }} />

                          <PrimaryButton
                            label='Buscar'
                            style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                            onPress={() => {
                              dispatch({ type: 'clear_books' });
                              handleSearch(0)
                            }} />
                        </View>

                        <View style={{ height: 20 }} />

                        {state.books?.length > 0 &&
                          <View style={{ width: '100%' }}>
                            <LazyDropdown
                              placeholder="Selecione seu livro"
                              items={state.books}
                              maxHeight={300}
                              keyExtractor={(item) => item.id}
                              onEndReached={handleEndReached}
                              onSelect={(bookView) => dispatch({ type: 'set_selected_book', payload: bookView })}
                              getItemLabel={(item) => item.title ?? ""}
                              renderItem={(item) => (
                                <View style={{ padding: 8, backgroundColor: WhiteColor }}>
                                  <Text>{item.title}</Text>
                                </View>
                              )} />
                          </View>
                        }

                        <View style={{ height: 20 }} />

                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: PrimaryGreenColor,
                              paddingVertical: 12,
                              paddingHorizontal: 8,
                              borderRadius: 8,
                            }}>
                            <Text>{state.selectedBook?.title ?? " "}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: 20 }} />

                  <View>
                    <View>
                      <Text>Endereço e valor:</Text>
                      <View style={styles.buttonContainer}>

                        <View style={{ width: '100%' }}>
                          <Dropdown
                            style={{ flex: 1 }}
                            placeholder="Selecione seu endereço"
                            items={state.userAddresses}
                            value={state.selectedAddress}
                            onSelect={(item) => dispatch({ type: 'set_selected_address', payload: item })}
                            getValue={(item) => item.name ?? ""}>
                            {(item) => <View style={{ padding: 8, backgroundColor: WhiteColor }}><Text>{item.name}</Text></View>}
                          </Dropdown>
                        </View>

                        <View style={{ height: 20 }} />

                        <View>
                          <CurrencyInput
                            style={{ flex: 1 }}
                            placeholder="Digite o valor de venda"
                            editable={state.sale}
                            value={state.saleValue}
                            onChangeText={(value) => { dispatch({ type: 'set_sale_value', payload: value }) }}
                            label="Valor de venda"
                          />

                          <View style={{ height: 10 }} />

                          <CurrencyInput
                            style={{ flex: 1 }}
                            placeholder="Digite o valor da diaria"
                            editable={state.rent}
                            value={state.rentValue}
                            onChangeText={(value) => dispatch({ type: 'set_rent_value', payload: value })}
                            label="Valor da aluguel(diaria)"
                          />
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text>Descrição:</Text>
                      <View style={styles.buttonContainer}>
                        <TextArea
                          style={{ height: 200 }}
                          onChange={(value) => dispatch({ type: 'set_description', payload: value })}
                          value={state.description}
                          placeholder="Digite a descrição do produto" />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ paddingVertical: 20 }}>
                  {state.announcement && state.announcement.images && state.announcement.images?.length > 0 && (
                    <View style={{ width: '100%' }}>
                      <Text>Imagens:</Text>
                      <View style={{ flexDirection: 'row', width: '100%', height: 200, borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal>
                          <View style={{ flexDirection: 'row', height: 200, padding: 5 }}>
                            {
                              state.announcement.images.map((file, index) => {
                                return (
                                  <Image
                                    key={index}
                                    source={{ uri: getImageLink(file) }}
                                    style={{ width: 180, height: 180, margin: 5 }} />
                                );
                              })
                            }
                          </View>
                        </ScrollView>
                      </View>
                      <View style={{ height: 20 }} />
                    </View>
                  )}

                  <Text>Upload imagem da capa:</Text>
                  <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      {UploadFileInput}
                      <Text style={{ fontSize: 18 }}>Faça upload de suas imagens aqui</Text>
                      <View style={{ height: 20 }} />
                      <PrimaryButton
                        label="Select file"
                        style={{ width: 200 }}
                        onPress={() => {
                          if (Platform.OS === "web") {
                            const fileInput = document.getElementById("fileInput")
                            fileInput!.click();
                          } else if (Platform.OS === 'android') {
                            uploadFileMobile();
                          }
                        }} />
                    </View>
                  </View>

                  {/* Preview Web */}

                  {state.uploadedFiles.length > 0 && (
                    <View style={{ width: '100%' }}>
                      <View style={{ height: 20 }} />
                      <Text>Preview:</Text>
                      <View style={{ flexDirection: 'row', width: '100%', height: 200, borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal>
                          <View style={{ flexDirection: 'row', height: 200, padding: 5 }}>
                            {
                              state.uploadedFiles.map((file, index) => {
                                return (
                                  <Image
                                    key={index}
                                    source={{ uri: URL.createObjectURL(file) }}
                                    style={{ width: 180, height: 180, margin: 5 }} />
                                );
                              })
                            }
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  )}

                  {/* Preview Mobile */}

                  {state.uploadedFilesMobile.length > 0 && (
                    <View style={{ width: '100%' }}>
                      <View style={{ height: 20 }} />
                      <Text>Preview:</Text>
                      <View style={{ flexDirection: 'row', width: '100%', height: 200, borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal>
                          <View style={{ flexDirection: 'row', height: 200, padding: 5 }}>
                            {
                              state.uploadedFilesMobile.map((file, index) => {
                                return (
                                  <Image
                                    key={index}
                                    source={{ uri: file.uri }}
                                    style={{ width: 180, height: 180, margin: 5 }} />
                                );
                              })
                            }
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  )}
                </View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <DestructiveButton
                    label="Voltar"
                    onPress={() => { navigation.navigate("Meus Anúncios", {}) }} />

                  <PrimaryButton
                    label={state.announcement ? "Salvar" : "Criar"}
                    style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                    activeStyle={state.validateInput}
                    onPress={() => {
                      if (state.validateInput) {
                        handleSaveAnnouncement()
                      }
                    }} />
                </View>
              </View>
            </ScrollView>
          )
        }

        {useMediaQuery(600, 10000) && (
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            <View style={styles.contentContainer}>
              <View style={styles.form}>
                <View style={styles.left}>
                  <View>
                    <Text>Escolha o tipo:</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                      <PrimaryButton
                        label="Venda"
                        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                        activeStyle={state.sale}
                        onPress={() => dispatch({ type: 'set_sale', payload: !state.sale })} />

                      <View style={{ width: 10 }} />

                      <PrimaryButton
                        label="Troca"
                        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                        activeStyle={state.trade}
                        onPress={() => dispatch({ type: 'set_trade', payload: !state.trade })} />

                      <View style={{ width: 10 }} />

                      <PrimaryButton
                        label="Aluguel"
                        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                        activeStyle={state.rent}
                        onPress={() => dispatch({ type: 'set_rent', payload: !state.rent })} />
                    </View>
                  </View>

                  <View style={{ height: 30 }} />

                  <View>
                    <Text>Escolha o livro:</Text>
                    <View style={styles.selectContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <SearchInput
                          style={{ flex: 1 }}
                          onChange={(value) => dispatch({ type: 'set_search_term', payload: value })}
                          placeholder="Pesquisar por livro" />

                        <View style={{ width: 10 }} />

                        <PrimaryButton
                          label='Buscar'
                          style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                          onPress={() => {
                            dispatch({ type: 'clear_books' });
                            handleSearch(0)
                          }} />
                      </View>

                      <View style={{ height: 20 }} />

                      {state.books?.length > 0 &&
                        <View style={{ width: '100%' }}>
                          <LazyDropdown
                            style={{ flex: 1 }}
                            placeholder="Selecione seu livro"
                            items={state.books}
                            maxHeight={300}
                            onEndReached={handleEndReached}
                            onSelect={(bookView) => dispatch({ type: 'set_selected_book', payload: bookView })}
                            getItemLabel={(item) => item.title ?? ""}
                            renderItem={(item) => (
                              <View style={{ padding: 8, backgroundColor: WhiteColor }}>
                                <Text>{item.title}</Text>
                              </View>
                            )} />
                        </View>
                      }

                      <View style={{ height: 20 }} />

                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: PrimaryGreenColor,
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            borderRadius: 8,
                          }}>
                          <Text>{state.selectedBook?.title ?? " "}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ width: 20 }} />

                <View style={styles.right}>
                  <View>
                    <Text>Endereço e valor:</Text>
                    <View style={styles.buttonContainer}>

                      <View style={{ width: '100%' }}>
                        <Dropdown
                          style={{ flex: 1 }}
                          placeholder="Selecione seu endereço"
                          items={state.userAddresses}
                          value={state.selectedAddress}
                          onSelect={(item) => dispatch({ type: 'set_selected_address', payload: item })}
                          getValue={(item) => item.name ?? ""}>
                          {(item) => <View style={{ padding: 8, backgroundColor: WhiteColor }}><Text>{item.name}</Text></View>}
                        </Dropdown>
                      </View>

                      <View style={{ height: 20 }} />

                      <View style={{ flexDirection: 'row', width: '100%' }}>
                        <CurrencyInput
                          style={{ flex: 1 }}
                          placeholder="Digite o valor de venda"
                          editable={state.sale}
                          value={state.saleValue}
                          onChangeText={(value) => { dispatch({ type: 'set_sale_value', payload: value }) }}
                          label="Valor de venda"
                        />

                        <View style={{ width: 10 }} />

                        <CurrencyInput
                          style={{ flex: 1 }}
                          placeholder="Digite o valor da diaria"
                          editable={state.rent}
                          value={state.rentValue}
                          onChangeText={(value) => dispatch({ type: 'set_rent_value', payload: value })}
                          label="Valor da aluguel(diaria)"
                        />
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text>Descrição:</Text>
                    <View style={styles.buttonContainer}>
                      <TextArea
                        style={{ height: 200 }}
                        onChange={(value) => dispatch({ type: 'set_description', payload: value })}
                        value={state.description}
                        placeholder="Digite a descrição do produto" />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ paddingVertical: 20 }}>
                {state.announcement && state.announcement.images && state.announcement.images?.length > 0 && (
                  <View style={{ width: '100%' }}>
                    <Text>Imagens:</Text>
                    <View style={{ flexDirection: 'row', width: '100%', height: 200, borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', height: 200, padding: 5 }}>
                          {
                            state.announcement.images.map((file, index) => {
                              return (
                                <Image
                                  key={index}
                                  source={getImageLink(file)}
                                  style={{ width: 180, height: 180, margin: 5 }} />
                              );
                            })
                          }
                        </View>
                      </ScrollView>
                    </View>
                    <View style={{ height: 20 }} />
                  </View>
                )}

                <Text>Upload imagem da capa:</Text>
                <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {UploadFileInput}
                    <Text style={{ fontSize: 18 }}>Faça upload de suas imagens aqui</Text>
                    <View style={{ height: 20 }} />
                    <PrimaryButton
                      label="Select file"
                      style={{ width: 200 }}
                      onPress={() => {
                        if (Platform.OS === "web") {
                          const fileInput = document.getElementById("fileInput")
                          fileInput!.click();
                        } else if (Platform.OS === 'android') {
                          uploadFileMobile();
                        }
                      }} />
                  </View>
                </View>

                {state.uploadedFiles.length > 0 && (
                  <View style={{ width: '100%' }}>
                    <View style={{ height: 20 }} />
                    <Text>Preview:</Text>
                    <View style={{ flexDirection: 'row', width: '100%', height: 200, borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', height: 200, padding: 5 }}>
                          {
                            state.uploadedFiles.map((file, index) => {
                              return (
                                <Image
                                  key={index}
                                  source={{ uri: URL.createObjectURL(file) }}
                                  style={{ width: 180, height: 180, margin: 5 }} />
                              );
                            })
                          }
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                )}

                {/* Preview Mobile */}

                {state.uploadedFilesMobile.length > 0 && (
                  <View style={{ width: '100%' }}>
                    <View style={{ height: 20 }} />
                    <Text>Preview:</Text>
                    <View style={{ flexDirection: 'row', width: '100%', height: 200, borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
                      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal>
                        <View style={{ flexDirection: 'row', height: 200, padding: 5 }}>
                          {
                            state.uploadedFilesMobile.map((file, index) => {
                              return (
                                <Image
                                  key={index}
                                  source={{ uri: file.uri }}
                                  style={{ width: 180, height: 180, margin: 5 }} />
                              );
                            })
                          }
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                )}
              </View>

              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <DestructiveButton
                  label="Voltar"
                  onPress={() => { navigation.navigate("Meus Anúncios", {}) }} />

                <PrimaryButton
                  label={state.announcement ? "Salvar" : "Criar"}
                  style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                  activeStyle={state.validateInput}
                  onPress={() => {
                    if (state.validateInput) {
                      handleSaveAnnouncement()
                    }
                  }} />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </ResponsiveNavbar>
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#E1DCC5",
  },
  contentContainerXs: {
    width: 320,
    padding: 10,
  },
  contentContainer: {
    width: 900,
    padding: 20,
  },
  formXs: {
    flex: 1,
    marginTop: 20,
  },
  form: {
    flexDirection: 'row',
    width: '100%',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
  },
  preview: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'column',
    paddingVertical: 15,
  },
  selectContainer: {
    paddingVertical: 15,
  }
});