// (C) 2007-2020 GoodData Corporation
import sortBy from "lodash/sortBy";

import {
    isStacked,
    toNeighbors,
    isIntersecting,
    getShapeAttributes,
    getAxisRangeForAxes,
    getDataPointsOfVisibleSeries,
    IAxisRangeForAxes,
} from "../../../chartTypes/_chartCreators/helpers";

import {
    hideDataLabels,
    hideDataLabel,
    hasDataLabel,
    getDataLabelAttributes,
    showDataLabelInAxisRange,
    showStackLabelInAxisRange,
    getShapeVisiblePart,
} from "../../../chartTypes/_chartCreators/dataLabelsHelpers";

const toggleStackedChartLabels = (visiblePoints: any[], axisRangeForAxes: IAxisRangeForAxes) => {
    const intersectionFound = visiblePoints.filter(hasDataLabel).some((point) => {
        const { dataLabel, shapeArgs } = point;

        if (dataLabel && shapeArgs) {
            const dataLabelAttr = getDataLabelAttributes(point);
            const shapeAttr = getShapeAttributes(point);
            return dataLabelAttr.height + 2 * dataLabel.padding > shapeAttr.height;
        }
        return false;
    });

    if (intersectionFound) {
        hideDataLabels(visiblePoints);
    } else {
        visiblePoints.filter(hasDataLabel).forEach((point) => {
            const {
                dataLabel,
                shapeArgs,
                series: { chart },
            } = point;
            if (dataLabel && shapeArgs) {
                const dataLabelAttr = getDataLabelAttributes(point);
                const shapeAttr = getShapeAttributes(point);
                const labelWidth = dataLabelAttr.width + 2 * dataLabel.padding;
                const shapeWidth = getShapeVisiblePart(shapeArgs, chart, shapeAttr.width);

                const foundIntersection = labelWidth > shapeWidth;
                // switch axis for bar chart
                return foundIntersection
                    ? hideDataLabel(point)
                    : showStackLabelInAxisRange(point, axisRangeForAxes);
            }
            return null;
        });
    }
};

const toggleNonStackedChartLabels = (
    points: any,
    axisRangeForAxes: IAxisRangeForAxes,
    shouldCheckShapeIntersection: boolean = false,
) => {
    const sortedPoints = sortBy(points, (a, b) => {
        const firstLabelAttr = getDataLabelAttributes(a);
        const nextLabelAttr = getDataLabelAttributes(b);
        return firstLabelAttr.y - nextLabelAttr.y;
    });

    const neighbors = toNeighbors(sortedPoints);
    const intersectionFound = neighbors.some(([firstPoint, nextPoint]) => {
        const firstDataLabelAttr = getDataLabelAttributes(firstPoint);
        const nextDataLabelAttr = getDataLabelAttributes(nextPoint);

        if (shouldCheckShapeIntersection) {
            const firstShapeAttr = getShapeAttributes(firstPoint);
            const nextShapeAttr = getShapeAttributes(nextPoint);

            return (
                isIntersecting(firstDataLabelAttr, nextDataLabelAttr) ||
                isIntersecting(firstDataLabelAttr, nextShapeAttr) ||
                isIntersecting(firstShapeAttr, nextDataLabelAttr)
            );
        }

        return isIntersecting(firstDataLabelAttr, nextDataLabelAttr);
    });

    if (intersectionFound) {
        hideDataLabels(points);
    } else {
        points.forEach((point: any) => showDataLabelInAxisRange(point, point.y, axisRangeForAxes));
    }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const autohideBarLabels = (chart: any): void => {
    const isStackedChart = isStacked(chart);
    const visiblePoints = getDataPointsOfVisibleSeries(chart);
    const axisRangeForAxes: IAxisRangeForAxes = getAxisRangeForAxes(chart);

    if (isStackedChart) {
        toggleStackedChartLabels(visiblePoints, axisRangeForAxes);
    } else {
        toggleNonStackedChartLabels(visiblePoints, axisRangeForAxes, true);
    }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleBarLabelsOutsideChart = (chart: any): void => {
    const visiblePoints = getDataPointsOfVisibleSeries(chart);
    const axisRangeForAxes: IAxisRangeForAxes = getAxisRangeForAxes(chart);

    visiblePoints.forEach((point: any) => {
        if (!isStacked(chart)) {
            showDataLabelInAxisRange(point, point.y, axisRangeForAxes);
        } else {
            // fix for HCH bug for negative stack labels
            showStackLabelInAxisRange(point, axisRangeForAxes);
        }
    });
};
