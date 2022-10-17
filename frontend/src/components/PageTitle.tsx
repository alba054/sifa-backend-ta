import {Text, TextProps} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';

const PageTitle = (props: TextProps) => {
    const mediumScreenSize =  useMediaQuery("(min-width: 768px)")
    return (
        <Text 
            size={ mediumScreenSize ? 32 : 24} 
            weight={600} 
            color="primary-text" 
            {...props}
        >
            {props.children}
        </Text>
    )
}

export default PageTitle;