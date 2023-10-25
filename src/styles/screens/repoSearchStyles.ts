import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
  },
  textInputShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});