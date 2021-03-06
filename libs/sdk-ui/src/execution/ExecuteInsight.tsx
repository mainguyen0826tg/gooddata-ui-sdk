// (C) 2019 GoodData Corporation
import React from "react";
import { withExecution } from "./withExecution";
import { DataViewWindow, IWithLoadingEvents, WithLoadingResult } from "./withExecutionLoading";
import { IDimension, IExecutionDefinition, INullableFilter, ISortItem, ObjRef } from "@gooddata/sdk-model";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import isEqual from "lodash/isEqual";
import { withContexts } from "../base";
import { IExecuteErrorComponent, IExecuteLoadingComponent } from "./interfaces";
import invariant from "ts-invariant";

/**
 * @beta
 */
export interface IExecuteInsightProps extends IWithLoadingEvents<IExecuteInsightProps> {
    /**
     * Backend to execute against.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;

    /**
     * Workspace in whose context to perform the execution.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;

    /**
     * Reference to the insight for which you want to get the data view.
     */
    insight: ObjRef;

    /**
     * Optionally modify sorts on prepared insight execution, before it's executed.
     */
    sorts?: ISortItem[] | ((def: IExecutionDefinition, props: IExecuteInsightProps) => ISortItem[]);

    /**
     * Optionally modify dimensions on prepared insight execution, before it's executed.
     */
    dimensions?: IDimension[] | ((def: IExecutionDefinition, props: IExecuteInsightProps) => IDimension[]);

    /**
     * Optionally modify date formatting on prepared insight execution, before it's executed.
     */
    dateFormat?: string | ((def: IExecutionDefinition, props: IExecuteInsightProps) => string);

    /**
     * Optional filters to apply on server side.
     */
    filters?: INullableFilter[];

    /**
     * Optional name to use for files exported from this component. If you do not specify this, then
     * the componentName will be used instead.
     *
     * Note: it is also possible to pass custom name to the export function that will be sent via the
     * onExportReady callback. That approach is preferred if you need to assign the names in an ad-hoc
     * fashion.
     */
    exportTitle?: string;

    /**
     * Optional informative name of the component. This value is sent as telemetry information together
     * with the actual execution request. We recommend to set this because it can be useful for diagnostic
     * purposes.
     *
     * Defaults 'Execute'.
     */
    componentName?: string;

    /**
     * Specifies whether `Execute` should trigger execution and loading right after it is
     * mounted. If not specified defaults to `true`.
     *
     * If set to `false`, then the {@link WithLoadingResult#reload} function needs to be called
     * to trigger the execution and loading.
     */
    loadOnMount?: boolean;

    /**
     * Specifies whether `Execute` should load all data from backend or just a particular window - specified by
     * offset and size of the window.
     *
     * If not specified, all data will be loaded.
     */
    window?: DataViewWindow;

    /**
     * Child component to which rendering is delegated. This is a function that will be called
     * every time state of execution and data loading changes.
     *
     * @param executionResult - execution result, indicating state and/or results
     */
    children: (executionResult: WithLoadingResult) => React.ReactElement | null;

    /**
     * Optionally provide component for rendering of the loading state.
     *
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    LoadingComponent?: IExecuteLoadingComponent;

    /**
     * Optionally provide component for rendering of the error state.
     *
     * Note: When you provide both LoadingComponent and ErrorComponent, the children function with the execution result
     * will be called only with a successful result.
     */
    ErrorComponent?: IExecuteErrorComponent;
}

type Props = IExecuteInsightProps & WithLoadingResult;

const CoreExecute: React.FC<Props> = (props: Props) => {
    const { children, error, isLoading, reload, result, LoadingComponent, ErrorComponent } = props;

    if (ErrorComponent && error) {
        return <ErrorComponent error={error} />;
    }

    if (LoadingComponent && isLoading) {
        return <LoadingComponent />;
    }

    if (LoadingComponent && ErrorComponent && !result) {
        return null;
    }

    return children({
        error,
        isLoading,
        reload,
        result,
    });
};

function componentName(props: IExecuteInsightProps): string {
    return props.componentName || "ExecuteInsight";
}

function exportTitle(props: IExecuteInsightProps): string {
    return props.exportTitle || componentName(props);
}

/**
 * Gets data for a specific stored insight.
 *
 * @beta
 */
export const ExecuteInsight = withContexts(
    withExecution<IExecuteInsightProps>({
        exportTitle,
        execution: async (props) => {
            const { insight: insightRef, filters, sorts, dimensions, dateFormat, backend, workspace } = props;
            invariant(
                backend,
                "The backend in ExecuteInsight must be defined. Either pass it as a prop or make sure there is a BackendProvider up the component tree.",
            );
            invariant(
                workspace,
                "The workspace in ExecuteInsight must be defined. Either pass it as a prop or make sure there is a WorkspaceProvider up the component tree.",
            );

            const insight = await backend.workspace(workspace).insights().getInsight(insightRef);
            let insightExecution = backend.workspace(workspace).execution().forInsightByRef(insight, filters);

            if (sorts) {
                const resolvedSorts =
                    typeof sorts === "function" ? sorts(insightExecution.definition, props) : sorts;
                insightExecution = insightExecution.withSorting(...resolvedSorts);
            }
            if (dimensions) {
                const resolvedDimensions =
                    typeof dimensions === "function"
                        ? dimensions(insightExecution.definition, props)
                        : dimensions;
                insightExecution = insightExecution.withDimensions(...resolvedDimensions);
            }
            if (dateFormat) {
                const resolvedDateFormat =
                    typeof dateFormat === "function"
                        ? dateFormat(insightExecution.definition, props)
                        : dateFormat;
                insightExecution = insightExecution.withDateFormat(resolvedDateFormat);
            }

            return insightExecution;
        },
        events: (props: IExecuteInsightProps) => {
            const { onError, onLoadingChanged, onLoadingFinish, onLoadingStart, onExportReady } = props;

            return {
                onError,
                onLoadingChanged,
                onLoadingFinish,
                onLoadingStart,
                onExportReady,
            };
        },
        shouldRefetch: (prevProps: IExecuteInsightProps, nextProps: IExecuteInsightProps) => {
            const relevantProps: Array<keyof IExecuteInsightProps> = [
                "onError",
                "onLoadingChanged",
                "onLoadingFinish",
                "onLoadingStart",
            ];

            const relevantPropsDeepEqual: Array<keyof IExecuteInsightProps> = [
                "insight",
                "filters",
                "window",
            ];

            return (
                relevantProps.some((propName) => prevProps[propName] !== nextProps[propName]) ||
                relevantPropsDeepEqual.some((propName) => !isEqual(prevProps[propName], nextProps[propName]))
            );
        },
        loadOnMount: (props?: IExecuteInsightProps) => {
            const { loadOnMount = true } = props ?? {};

            return loadOnMount;
        },
        window: (props: IExecuteInsightProps) => props.window,
    })(CoreExecute),
);
