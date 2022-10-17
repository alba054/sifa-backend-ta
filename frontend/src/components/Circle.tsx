interface ICircleProps{
    size?: string
}

export const Circle = ({size}: ICircleProps) => {
    return (
        <div className={`${size ? `w-[${size}px] h-[${size}px]` : "w-3 h-3"}  rounded-full bg-[#34d227]`} />
    )
}