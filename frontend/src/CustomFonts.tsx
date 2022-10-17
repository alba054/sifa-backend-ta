import { Global } from "@mantine/core";
import NunitoRegular from './fonts/NunitoSans/NunitoSans-Regular.ttf'
import NunitoBold from './fonts/NunitoSans/NunitoSans-Bold.ttf'
import NunitoSemiBold from './fonts/NunitoSans/NunitoSans-SemiBold.ttf'
import NunitoLight from './fonts/NunitoSans/NunitoSans-Light.ttf'

const CustomFonts = () => {
    return(
        <Global 
            styles={[
                {
                    '@font-face': {
                        fontFamily: 'Nunito Sans',
                        src: `url(${NunitoLight}) format("truetype")`,
                        fontWeight: 300,
                        fontStyle: 'normal'
                    }
                },                
                {
                    '@font-face': {
                        fontFamily: 'Nunito Sans',
                        src: `url(${NunitoRegular}) format("truetype")`,
                        fontWeight: 400,
                        fontStyle: 'normal'
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Nunito Sans',
                        src: `url(${NunitoSemiBold}) format("truetype")`,
                        fontWeight: 600,
                        fontStyle: 'normal'
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Nunito Sans',
                        src: `url(${NunitoBold}) format("truetype")`,
                        fontWeight: 700,
                        fontStyle: 'normal'
                    }
                }
            ]}
        />
    )
}

export default CustomFonts;