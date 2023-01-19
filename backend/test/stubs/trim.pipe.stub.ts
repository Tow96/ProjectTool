export const stubTrimPipe = () => {
  return {
    password: 'shouldBeEncrypted    ',
    test: ' a string that should be trimmed     ',
    innerTest: {
      otherString: ' a string ',
    },
    number: 25,
  };
};
