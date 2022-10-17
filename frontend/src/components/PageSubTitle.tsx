import {Text, TextProps} from '@mantine/core'

const PageSubTitle = (props: TextProps) => {
    return (
        <Text 
            size={16} 
            weight={300} 
            color="primary-text" 
            {...props}
        >
            {props.children}
        </Text>
    )
}

export default PageSubTitle;