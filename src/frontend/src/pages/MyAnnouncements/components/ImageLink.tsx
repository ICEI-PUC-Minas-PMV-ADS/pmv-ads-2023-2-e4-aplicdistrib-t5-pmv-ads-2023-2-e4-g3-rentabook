import { Image, StyleSheet } from 'react-native';

/**
 * ImageLinkProps
 */

import { ImageLinksGoogleBooks } from "../../../types/ImageLinksGoogleBooks";

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
        source={{ uri: imageLinks?.thumbnail }}
        style={styles.thumbnail} />
    );
  }
  return (
    <Image
      source={require('/src/common/assets/notFound.jpg')}
      style={styles.placeholder} />
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  placeholder: {
    width: 100,
    height: 100,
    textAlignVertical: "auto",
    borderRadius: 25,
  },
  thumbnail: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
  }
});