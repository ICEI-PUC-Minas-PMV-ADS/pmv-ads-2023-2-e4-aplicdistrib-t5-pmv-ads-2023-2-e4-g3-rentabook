import React from "react";
import { Animated, View, Text, StyleSheet, Dimensions } from "react-native";
import { WhiteColor } from "../../common/theme/colors";

/**
 * MessageContextState
 */

export type MessageContextState = {
  showAlert: (message: string) => void,
};

/**
 * MessageContext
 */

export const MessageContext = React.createContext<MessageContextState>({
  showAlert: () => { },
});

/**
 * MessageContextProvider
 */

export const MessageContextProvider = ({ children }: { children: JSX.Element }) => {
  const fadeAnim = React.useRef(new Animated.Value(-30)).current;
  const [message, setMessage] = React.useState<string | undefined>();
  const windowWidth = Dimensions.get('window').width

  const showAlert = React.useCallback((msg: string) => {
    if (message === undefined) {
      fadeAnim.setValue(-30);

      Animated.timing(fadeAnim, {
        toValue: 50,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setMessage(msg);
      setTimeout(() => { setMessage(undefined) }, 2000);
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ showAlert }}>
      {message !== undefined &&
        <View style={styles.relativeContainer}>
          <View style={[styles.absoluteContainer, { width: windowWidth }]}>
            <Animated.View style={[styles.messageContainer, { transform: [{ translateY: fadeAnim }] }]}>
              <Text>{message}</Text>
            </Animated.View>
          </View>
        </View>
      }
      {children}
    </MessageContext.Provider>
  );
};

/**
 * useAlertMessage
 */

export const useAlertMessage = () => {
  return React.useContext(MessageContext);
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  relativeContainer: {
    position: 'relative',
    zIndex: 100,
    elevation: 100
  },
  absoluteContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    top: 20,
    left: 0,
    right: 0,
  },
  messageContainer: {
    width: 250,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: WhiteColor,
    paddingVertical: 15,
    shadowColor: '#7a7a7a',
    shadowRadius: 10,
  }
});