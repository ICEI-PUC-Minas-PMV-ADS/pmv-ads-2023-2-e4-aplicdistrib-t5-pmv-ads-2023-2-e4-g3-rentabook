import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ImageLinksGoogleBooks } from "../../../types/ImageLinksGoogleBooks";

/**
 * ImageLinkProps
 */

type ImageLinkProps = {
  imageLinks: ImageLinksGoogleBooks | null,
};

/**
 * ImageLink
 */

export function ImageLink({ imageLinks }: ImageLinkProps) {
  if (imageLinks?.thumbnail) {
    return (
      <Image
        source={imageLinks?.thumbnail}
        style={styles.thumbnail}
        contentFit='contain' />
    );
  }
  return (
    <Image
      source={require('../../../common/assets/notFound.jpg')}
      style={styles.placeholder}
      contentFit='contain' />
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  placeholder: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    textAlignVertical: "auto",
    borderRadius: 25,
  },
  thumbnail: {
    flex: 1,
  }
});