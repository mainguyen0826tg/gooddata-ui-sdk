// (C) 2021 GoodData Corporation
import { IAnalyticalBackend, IDateFilterConfig, ISeparators, ISettings } from "@gooddata/sdk-backend-spi";
import { IColorPalette, ObjRef } from "@gooddata/sdk-model";
import { ILocale } from "@gooddata/sdk-ui";

/**
 * Dashboard configuration can influence the available features, look and feel and behavior of the dashboard.
 *
 * @internal
 */
export type DashboardConfig = {
    /**
     * Locale to use for the dashboard.
     */
    locale?: ILocale;

    /**
     * Number separators to use for charts and KPIs on the dashboard.
     */
    separators?: ISeparators;

    /**
     * Settings may influence how the dashboard behaves or what features it exposes.
     */
    settings?: ISettings;

    /**
     * Date filter configuration is used to influence what filtering presets (options) should be
     * available on the date filter component.
     */
    dateFilterConfig?: IDateFilterConfig;

    /**
     * Color palette to pass down to charts.
     */
    colorPalette?: IColorPalette;
};

/**
 * Values in this context will be available to all sagas.
 *
 * @internal
 */
export type DashboardContext = {
    /**
     * Analytical Backend where the dashboard exists.
     */
    backend: IAnalyticalBackend;

    /**
     * Analytical Backend where the dashboard exists.
     */
    workspace: string;

    /**
     * Dashboard that should be loaded into the store.
     */
    dashboardRef?: ObjRef;
};
