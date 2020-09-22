// (C) 2020 GoodData Corporation
import { DependencyGraph } from "../types";
import groupBy from "lodash/groupBy";

const SdkDependencySnapshot: Partial<DependencyGraph> = {
    nodes: [
        "@gooddata/applink",
        "@gooddata/experimental-workspace",
        "@gooddata/util",
        "@gooddata/sdk-embedding",
        "@gooddata/sdk-ui-kit",
        "@gooddata/live-examples-workspace",
        "@gooddata/sdk-ui-vis-commons",
        "@gooddata/sdk-ui-geo",
        "@gooddata/sdk-ui-all",
        "@gooddata/sdk-backend-base",
        "@gooddata/sdk-ui-charts",
        "@gooddata/sdk-ui-filters",
        "@gooddata/sdk-ui-pivot",
        "@gooddata/sdk-ui-ext",
        "@gooddata/reference-workspace-mgmt",
        "@gooddata/sdk-ui-tests",
        "@gooddata/reference-workspace",
        "@gooddata/catalog-export",
        "@gooddata/mock-handling",
        "@gooddata/sdk-backend-mockingbird",
        "@gooddata/sdk-backend-tiger",
        "@gooddata/sdk-backend-bear",
        "@gooddata/sdk-model",
        "@gooddata/sdk-backend-spi",
        "@gooddata/api-client-tiger",
        "@gooddata/api-client-bear",
        "@gooddata/api-model-bear",
        "@gooddata/sdk-ui",
        "@gooddata/sdk-skel-tsx",
        "@gooddata/sdk-skel-ts",
    ],
    edges: [
        {
            from: "@gooddata/experimental-workspace",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/experimental-workspace",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/experimental-workspace",
            to: "@gooddata/catalog-export",
            type: "dev",
        },
        {
            from: "@gooddata/experimental-workspace",
            to: "@gooddata/mock-handling",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-embedding",
            to: "@gooddata/api-model-bear",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-kit", to: "@gooddata/sdk-ui", type: "prod" },
        {
            from: "@gooddata/sdk-ui-kit",
            to: "@gooddata/util",
            type: "prod",
        },
        {
            from: "@gooddata/live-examples-workspace",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/live-examples-workspace",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/live-examples-workspace",
            to: "@gooddata/catalog-export",
            type: "dev",
        },
        {
            from: "@gooddata/live-examples-workspace",
            to: "@gooddata/mock-handling",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-vis-commons",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-vis-commons",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-vis-commons",
            to: "@gooddata/sdk-ui",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-vis-commons",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-vis-commons",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-geo",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-geo", to: "@gooddata/sdk-model", type: "prod" },
        {
            from: "@gooddata/sdk-ui-geo",
            to: "@gooddata/sdk-ui",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-geo",
            to: "@gooddata/sdk-ui-vis-commons",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-geo",
            to: "@gooddata/live-examples-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-geo",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-all",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-all", to: "@gooddata/sdk-model", type: "prod" },
        {
            from: "@gooddata/sdk-ui-all",
            to: "@gooddata/sdk-ui",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-all",
            to: "@gooddata/sdk-ui-charts",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-all", to: "@gooddata/sdk-ui-ext", type: "prod" },
        {
            from: "@gooddata/sdk-ui-all",
            to: "@gooddata/sdk-ui-filters",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-all", to: "@gooddata/sdk-ui-geo", type: "prod" },
        {
            from: "@gooddata/sdk-ui-all",
            to: "@gooddata/sdk-ui-pivot",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-base",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-base",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-base",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-charts",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-charts",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-charts",
            to: "@gooddata/sdk-ui",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-charts",
            to: "@gooddata/sdk-ui-vis-commons",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-charts", to: "@gooddata/util", type: "prod" },
        {
            from: "@gooddata/sdk-ui-charts",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-charts",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-filters",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-filters",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-filters",
            to: "@gooddata/sdk-ui",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-filters",
            to: "@gooddata/util",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-filters",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-filters",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-pivot",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-pivot",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-pivot", to: "@gooddata/sdk-ui", type: "prod" },
        {
            from: "@gooddata/sdk-ui-pivot",
            to: "@gooddata/sdk-ui-vis-commons",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-pivot",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-pivot",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-backend-base",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-embedding",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-ext", to: "@gooddata/sdk-model", type: "prod" },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-ui",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-ui-charts",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-ext", to: "@gooddata/sdk-ui-geo", type: "prod" },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-ui-pivot",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-ui-vis-commons",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-ext", to: "@gooddata/util", type: "prod" },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/live-examples-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-ext",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "dev",
        },
        {
            from: "@gooddata/reference-workspace-mgmt",
            to: "@gooddata/catalog-export",
            type: "prod",
        },
        {
            from: "@gooddata/reference-workspace-mgmt",
            to: "@gooddata/mock-handling",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/experimental-workspace",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/live-examples-workspace",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/mock-handling",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/reference-workspace",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-backend-base",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui-tests", to: "@gooddata/sdk-ui", type: "dev" },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-charts",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-ext",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-filters",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-geo",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-kit",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-pivot",
            type: "dev",
        },
        { from: "@gooddata/sdk-ui-tests", to: "@gooddata/sdk-ui", type: "peer" },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-charts",
            type: "peer",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-ext",
            type: "peer",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-filters",
            type: "peer",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-geo",
            type: "peer",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-kit",
            type: "peer",
        },
        {
            from: "@gooddata/sdk-ui-tests",
            to: "@gooddata/sdk-ui-pivot",
            type: "peer",
        },
        {
            from: "@gooddata/reference-workspace",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/reference-workspace",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/catalog-export",
            to: "@gooddata/api-client-bear",
            type: "prod",
        },
        {
            from: "@gooddata/catalog-export",
            to: "@gooddata/api-client-tiger",
            type: "prod",
        },
        {
            from: "@gooddata/catalog-export",
            to: "@gooddata/api-model-bear",
            type: "prod",
        },
        {
            from: "@gooddata/mock-handling",
            to: "@gooddata/api-model-bear",
            type: "prod",
        },
        {
            from: "@gooddata/mock-handling",
            to: "@gooddata/sdk-backend-bear",
            type: "prod",
        },
        {
            from: "@gooddata/mock-handling",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/mock-handling",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-mockingbird",
            to: "@gooddata/sdk-backend-base",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-mockingbird",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-mockingbird",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-mockingbird",
            to: "@gooddata/api-model-bear",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-backend-mockingbird",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-backend-tiger",
            to: "@gooddata/api-client-tiger",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-tiger",
            to: "@gooddata/sdk-backend-base",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-tiger",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-tiger",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-tiger",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/api-client-bear",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/api-model-bear",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/sdk-backend-base",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/sdk-embedding",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-backend-bear",
            to: "@gooddata/sdk-backend-mockingbird",
            type: "dev",
        },
        {
            from: "@gooddata/sdk-backend-spi",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/api-client-tiger",
            to: "@gooddata/sdk-backend-spi",
            type: "prod",
        },
        {
            from: "@gooddata/api-client-tiger",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        {
            from: "@gooddata/api-client-tiger",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        {
            from: "@gooddata/api-client-bear",
            to: "@gooddata/api-model-bear",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui", to: "@gooddata/sdk-backend-spi", type: "prod" },
        {
            from: "@gooddata/sdk-ui",
            to: "@gooddata/sdk-model",
            type: "prod",
        },
        { from: "@gooddata/sdk-ui", to: "@gooddata/util", type: "prod" },
        {
            from: "@gooddata/sdk-ui",
            to: "@gooddata/reference-workspace",
            type: "dev",
        },
        { from: "@gooddata/sdk-ui", to: "@gooddata/sdk-backend-mockingbird", type: "dev" },
    ],
};

/**
 *
 * @param partialGraph
 */
function rehydrateGraph(partialGraph: Partial<DependencyGraph>): DependencyGraph {
    const { nodes = [], edges = [] } = partialGraph;
    const nodesSet = new Set<string>();

    for (const pkg of nodes) {
        nodesSet.add(pkg);
    }

    return {
        nodes,
        nodesSet,
        edges,
        outgoing: groupBy(edges, (e) => e.from),
        incoming: groupBy(edges, (e) => e.to),
    };
}

export const TestSdkDependencyGraph = rehydrateGraph(SdkDependencySnapshot);
