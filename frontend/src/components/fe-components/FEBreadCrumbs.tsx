import { Anchor, Breadcrumbs, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export interface IFEBreadCrumbsItem {
  title: string;
  href: string;
}

export interface IFEBreadCrumbs {
  items: Array<IFEBreadCrumbsItem>,
  current?: string
}

const FEBreadCrumbs: React.FC<IFEBreadCrumbs> = ({ items, current }) => {
  const tempBreadCrumbs = items.map((item, index) => (
    <Link key={index} to={item.href} className='text-primary-500 font-semibold' >
      {item.title}
    </Link>
  ));

  const breadCrumbs = [[...tempBreadCrumbs], (<Text key={-1} className="text-primary-text-500 inline font-semibold">
    {current}
  </Text>)]

  return (
    <>
      <Breadcrumbs>{breadCrumbs}</Breadcrumbs>
    </>
  );
};
export default FEBreadCrumbs;
