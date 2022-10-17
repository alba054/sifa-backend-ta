import { Badge as MantineBadge, BadgeProps } from "@mantine/core";

const Badge = (props: BadgeProps) => {
    return (
        <MantineBadge className="text-[14px] bg-[#e5e7eb] rounded-full font-semibold normal-case">
            {props.children}
        </MantineBadge>
    )
}

export default Badge;