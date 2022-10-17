import { 
    TextInput as MantineTextInput, 
    TextInputProps, 
    TextInputStylesNames,
    SelectProps,
     
    Styles, 
    NumberInput as MantineNumberInput,
    NumberInputProps,
    NumberInputStylesNames, 
    useMantineTheme,
    SelectStylesNames,
    Select
} from '@mantine/core'

import { useState } from 'react'

const getDefaultStyle = (isFocus: boolean): Styles<TextInputStylesNames|NumberInputStylesNames|SelectStylesNames> | undefined => {
    const theme = useMantineTheme()
    return {
        input: {
            ":focus": {
                border: "2px solid #5F5AF7",
                color: theme.colors.primary[5]
            },
            border: "2px solid #B5C2D1",
            borderRadius: theme.radius.md,
            color: theme.colors['secondary-text'][5],
            marginTop: "8px",
        },
        label: {
            fontSize: "18px",
            fontWeight: 600,
            color: `${isFocus ? "#5f5af7" : "#b5c2d1"}`
        }
    }
}

export const TextInput = (props: TextInputProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <>
            <MantineTextInput
                {...props} 
                className='text-primary-500'
                size='lg'
                styles={getDefaultStyle(isFocus)}
                onFocus = {() => setIsFocus(true)}
                onBlur = {() => setIsFocus(false)}
            />
            {/* {console.log(isFocus)} */}
        </>
        
    )
}

export const NumberInput = (props: NumberInputProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <MantineNumberInput
        {...props} 
            size='lg'
            hideControls
            styles={getDefaultStyle(isFocus)}
            onFocus = {() => setIsFocus(true)}
            onBlur = {() => setIsFocus(false)}
        />
    )
}

export const SelectInput = (props: SelectProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <Select 
        {...props}
            size='lg'
            styles={getDefaultStyle(isFocus)}
            onFocus = {() => setIsFocus(true)}
            onBlur = {() => setIsFocus(false)}
        />
    )
}

