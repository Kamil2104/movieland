import { OptionType, StateKeyType } from "./settingsTypes";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Main: undefined;
};

export type AccountStackParamList = {
    AccountMain: undefined;
    OptionsScreen: {
        stateKey: StateKeyType,
        title: string,
        options: string[],
        selectedOptionParam: OptionType
    };
};