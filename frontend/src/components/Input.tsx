import { FocusEventHandler, useState, ComponentProps } from "react";
import { EyeHideFilled, EyeShowFilled, IconColorScheme } from "../assets/Icons/Fluent";

interface IInputProps{
    label?: string;
    placeholder?: string;
    icon?: JSX.Element;
    color?: ColorScheme;
    hint? : string;
    isError?: boolean;
    readonly?: boolean;
}

interface IPasswordInputProps{
    disableEyeIcon?: boolean
}

export enum ColorScheme{
    primaryText = "primary-text-500",
    secondaryText = "secondary-text-500",
    primary = "primary-500",
    secondary = "secondary-500",
    error = "error-500",
    background = "background-500",
    divider = "divider-500"
}

type InputProps = ComponentProps<"input">

export const TextInput = (props: IInputProps & InputProps) => {
    return(
        <div>
            {props.label && (
                <label className={`${props.color ? "text-"+props.color : "text-secondary-text-500" } font-semibold`}>
                    {props.label}
                </label>
            )}
            <div className={`flex flex-row items-center ${props.label && "mt-3"} border-2 ${props.color ? "border-"+props.color : "border-secondary-500"} rounded-md`}>
                <div className="px-2">
                    {props.icon}
                </div>
                <input
                    {...props}
                    readOnly={props.readonly}
                    value={props.value}
                    onChange={props.onChange}
                    className={`min-w-0 py-2 px-2 bg-transparent outline-none ${props.color ? "text-" + props.color : "text-secondary-text-500"} w-full`} 
                    placeholder={props.placeholder} 
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                />
            </div>
            {
                props.hint && <p className={`text-sm ${props.isError ? "text-error-500" : "text-secondary-text-500"}  py-2 px-3`}>{`${props.hint}`}</p>
            }
            
        </div>
    )
}

export const PasswordInput = (props: IInputProps & IPasswordInputProps & InputProps ) => {

    const [hide, setHide] = useState<boolean>(true);

    return(
        <div>
            <label className={`${props.color ? "text-"+props.color : "text-secondary-text-500" } font-semibold`}>
                {props.label}
            </label>
            <div className={`flex flex-row items-center mt-3 border-2 ${props.color ? `border-${props.color}` : "border-secondary-500"} rounded-md`}>
                <div className="px-2">
                    {props.icon}
                </div>
                <input
                    readOnly={props.readonly}
                    value={props.value}
                    onChange={props.onChange}
                    className={`min-w-0 py-3 px-2 bg-transparent outline-none ${props.color ? "text-"+props.color : "text-secondary-text-500"} w-full`} 
                    placeholder={props.placeholder} 
                    type={hide ? "password" : 'text'}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                />
                
                {!props.disableEyeIcon && (
                    <div className="px-2">
                        {
                            hide ? <EyeShowFilled className="cursor-pointer" color={IconColorScheme.secondaryText} onClick={(e) =>{
                                setHide(false)
                            }} /> : <EyeHideFilled className="cursor-pointer" color={IconColorScheme.secondaryText} onClick={(e) => {
                                setHide(true)
                            }} />
                        }
                    </div>
                )}
            </div>
            {
                props.hint && <p className="text-sm text-secondary-text-500 py-2 px-3">{`*${props.hint}`}</p>
            }
        </div>
    )
}
