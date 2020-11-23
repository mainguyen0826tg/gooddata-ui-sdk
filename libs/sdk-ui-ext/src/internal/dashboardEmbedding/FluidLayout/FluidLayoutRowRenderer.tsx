// (C) 2007-2020 GoodData Corporation
import React from "react";
import { Row } from "react-grid-system";
import { IFluidLayoutColumn, IFluidLayoutRow } from "@gooddata/sdk-backend-spi";
import { IFluidLayoutRowRenderer } from "./interfaces";

export const FluidLayoutRowRenderer: IFluidLayoutRowRenderer<
    any,
    IFluidLayoutColumn<any>,
    IFluidLayoutRow<any, IFluidLayoutColumn<any>>
> = (props) => {
    const { children, row: _row, rowIndex: _rowIndex, screen: _screen, ...htmlProps } = props;

    return <Row {...htmlProps}>{children}</Row>;
};
