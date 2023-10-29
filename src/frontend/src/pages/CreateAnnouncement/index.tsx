import * as React from 'react';
import { View, Text, StyleSheet } from "react-native";
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar";
import PrimaryButton from "../../common/components/PrimaryButton";
import SearchInput from "../../common/components/SearchInput";
import { PrimaryGreenColor, WhiteColor } from "../../common/theme/colors";
import Dropdown from "../../common/components/Dropdown";
import Input from "../../common/components/Input";
import TextArea from "../../common/components/TextArea";
import DestructiveButton from "../../common/components/DestructiveButton";
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { PrivateAddress } from '../../types/PrivateAddress';
import { BookView } from '../../types/BookView';
import { bookService } from '../../services/bookService';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackTypes';
import { announcementsService } from '../../services/announcementsService';
import CurrencyInput from '../../common/components/CurrencyInput';
import { CleanAnnouncementView } from '../../types/CleanAnnouncementView';
import { AppParamsList } from '../../routes/AppParamsList';

/**
 * CreateAnnouncementProps
 */

type CreateAnnouncementProps = {};

/**
 * CreateAnnouncement
 */

export function CreateAnnouncement({ }: CreateAnnouncementProps) {
  const navigation = useNavigation<StackTypes>();
  const route = useRoute<RouteProp<AppParamsList, 'Criar Anúncio'>>()
  const announcementId = route.params?.announcementId

  const [announcement, setAnnouncement] = React.useState<CleanAnnouncementView | null>(null);
  const [sale, setSale] = React.useState(false);
  const [trade, setTrade] = React.useState(false);
  const [rent, setRent] = React.useState(false);
  const [saleValue, setSaleValue] = React.useState<string | null>(null);
  const [rentValue, setRentValue] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);
  const [userAddresses, setUserAddresses] = React.useState<PrivateAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = React.useState<PrivateAddress | null>(null);
  const [books, setBooks] = React.useState<BookView[]>([]);
  const [selectedBook, setSelectedBook] = React.useState<BookView | null>(null);
  const [validateInput, setValidateInput] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const auth = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!announcement) {
      setSaleValue(null)
    } else {
      setSaleValue(announcement.valueForSale ? announcement.valueForSale.toString() : null)
    }
  }, [sale]);

  React.useEffect(() => {
    if (!announcement) {
      setRentValue(null)
    } else {
      setRentValue(announcement.valueForRent ? announcement.valueForRent.toString() : null)
    }
  }, [rent]);

  React.useEffect(() => {
    if (announcementId) {
      announcementsService.getAnnouncementById(announcementId)
        .then((announcement: CleanAnnouncementView) => {
          setAnnouncement(announcement);
        });
    }
  }, [announcementId, auth.user?.addresses]);

  React.useEffect(() => {
    if (announcement) {
      setSale(announcement.sale);
      setTrade(announcement.trade);
      setRent(announcement.rent);

      if (announcement.valueForSale) { setSaleValue(announcement.valueForSale!!.toString()); }
      if (announcement.valueForRent) { setRentValue(announcement.valueForRent!!.toString()); }

      if (announcement.book) { setSelectedBook(announcement.book); }
      if (announcement.location) {
        if (auth.user && auth.user.addresses) {
          for (let i = 0; i < auth.user.addresses.length; i++) {
            if (auth.user.addresses[i]?.id === announcement.location.id) {
              setSelectedAddress(auth.user.addresses[i])
            }
          }
        }
      }

      setDescription(announcement.description);
    }
  }, [announcement]);

  React.useEffect(() => {
    if (auth.user && auth.user.addresses) {
      const addresses: PrivateAddress[] = [];
      for (let i in auth.user.addresses) {
        if (auth.user.addresses[i]) {
          addresses.push(auth.user.addresses[i]!!);
        }
      }
      setUserAddresses(addresses);
    }
  }, [auth.user?.addresses]);

  const handleSearch = React.useCallback(() => {
    if (searchTerm) {
      bookService.searchBook(searchTerm)
        .then((foundedBooks) => setBooks(foundedBooks.content as BookView[]));
    }
  }, [searchTerm]);

  React.useEffect(() => {
    if (!selectedBook) {
      setValidateInput(false);
      return;
    }
    if (rent && !rentValue) {
      setValidateInput(false);
      return;
    }
    if (sale && !saleValue) {
      setValidateInput(false);
      return;
    }
    if (!rent && !sale && !trade) {
      setValidateInput(false);
      return;
    }
    if (!selectedAddress) {
      setValidateInput(false);
      return;
    }
    setValidateInput(true);
  }, [selectedBook, rent, rentValue, sale, saleValue, trade, selectedAddress]);

  const handleSaveAnnouncement = async () => {
    await announcementsService.createAnnouncement({
      bookId: selectedBook!!.id!!,
      description: description,
      locationId: selectedAddress!!.id!!,
      valueForRent: rentValue,
      valueForSale: saleValue,
      rent: rent,
      trade: trade,
      sale: sale,
    });
    navigation.navigate("Meus Anúncios", {});
  };

  return (
    <ResponsiveNavbar>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.form}>
            <View style={styles.left}>
              <View>
                <Text>Escolha o tipo:</Text>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                  <PrimaryButton
                    label="Venda"
                    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    activeStyle={sale}
                    onPress={() => { setSale((sale) => !sale) }} />

                  <View style={{ width: 10 }} />

                  <PrimaryButton
                    label="Troca"
                    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    activeStyle={trade}
                    onPress={() => { setTrade((trade) => !trade) }} />

                  <View style={{ width: 10 }} />

                  <PrimaryButton
                    label="Aluguel"
                    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    activeStyle={rent}
                    onPress={() => { setRent((rent) => !rent) }} />
                </View>
              </View>

              <View style={{ height: 30 }} />

              <View>
                <Text>Escolha o livro:</Text>
                <View style={styles.selectContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <SearchInput
                      style={{ flex: 1 }}
                      onChange={(value) => setSearchTerm(value)}
                      placeholder="Pesquisar por livro" />

                    <View style={{ width: 10 }} />

                    <PrimaryButton
                      label='Buscar'
                      style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                      onPress={() => { handleSearch() }} />
                  </View>

                  <View style={{ height: 20 }} />

                  {books?.length > 0 &&
                    <View style={{ width: '100%' }}>
                      <Dropdown
                        style={{ flex: 1 }}
                        placeholder="Selecione seu livro"
                        items={books}
                        onSelect={(bookView) => setSelectedBook(bookView)}
                        getValue={(item) => item.title ?? ""}>
                        {(item) => <View style={{ padding: 8, backgroundColor: WhiteColor }}><Text>{item.title}</Text></View>}
                      </Dropdown>
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
                      <Text>{selectedBook?.title ? selectedBook.title : " "}</Text>
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
                      items={userAddresses}
                      value={selectedAddress}
                      onSelect={(item) => setSelectedAddress(item)}
                      getValue={(item) => item.name}>
                      {(item) => <View style={{ padding: 8, backgroundColor: WhiteColor }}><Text>{item.name}</Text></View>}
                    </Dropdown>
                  </View>

                  <View style={{ height: 20 }} />

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <CurrencyInput
                      style={{ flex: 1 }}
                      placeholder="Digite o valor de venda"
                      editable={sale}
                      value={saleValue}
                      onChangeText={(value) => setSaleValue(value)}
                      label="Valor de venda"
                    />

                    <View style={{ width: 10 }} />

                    <CurrencyInput
                      style={{ flex: 1 }}
                      placeholder="Digite o valor da diaria"
                      editable={rent}
                      value={rentValue}
                      onChangeText={(value) => setRentValue(value)}
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
                    onChange={(value) => setDescription(value)}
                    placeholder="Digite a descrição do produto" />
                </View>
              </View>
            </View>
          </View>

          <View style={{ paddingVertical: 20 }}>
            <Text>Upload imagem da capa:</Text>
            <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Faça upload de suas imagens aqui</Text>
                <View style={{ height: 20 }} />
                <PrimaryButton
                  label="Select file"
                  style={{ width: 200 }}
                  onPress={() => { }} />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <DestructiveButton
              label="Voltar"
              onPress={() => { navigation.navigate("Meus Anúncios", {}) }} />

            <PrimaryButton
              label="Criar"
              style={{ paddingHorizontal: 16, paddingVertical: 12 }}
              activeStyle={validateInput}
              onPress={() => {
                if (validateInput) {
                  handleSaveAnnouncement()
                }
              }} />
          </View>
        </View>
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
  contentContainer: {
    width: 900,
    padding: 20,
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
  buttonContainer: {
    flexDirection: 'column',
    paddingVertical: 15,
  },
  selectContainer: {
    paddingVertical: 15,
  }
});