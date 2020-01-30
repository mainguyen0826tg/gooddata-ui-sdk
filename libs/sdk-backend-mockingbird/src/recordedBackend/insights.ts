// (C) 2019-2020 GoodData Corporation

import {
    IInsightQueryOptions,
    IInsightQueryResult,
    InsightOrdering,
    UnexpectedResponseError,
} from "@gooddata/sdk-backend-spi";
import {
    IInsight,
    IInsightDefinition,
    insightId,
    insightTitle,
    isIdentifierRef,
    ObjRef,
} from "@gooddata/sdk-model";
import { InsightRecording, RecordingIndex } from "./types";
import { identifierToRecording, RecordingPager } from "./utils";
import isEmpty = require("lodash/isEmpty");
import cloneDeep = require("lodash/cloneDeep");

let adHocInsightCounter = 1;

/**
 * Note: the impl always makes / gives clones of recorded insights to prevent mutable operations
 * impacting the recordings and thus violate client-server interaction integrity (client mutates, server
 * suddenly starts returning modified data for everyone)
 *
 * @internal
 */
export class RecordedInsights {
    private readonly insights: { [id: string]: InsightRecording };

    constructor(recordings: RecordingIndex = {}) {
        this.insights = recordings.metadata?.insights ?? {};
    }

    public async createInsight(def: IInsightDefinition): Promise<IInsight> {
        const newId = `adHocInsight_${adHocInsightCounter++}`;
        const newInsight = { insight: { identifier: newId, ...cloneDeep(def.insight) } };
        const recordingId = recId(newId);

        this.insights[recordingId] = { obj: newInsight };

        return newInsight;
    }

    public async getInsight(ref: ObjRef): Promise<IInsight> {
        if (isEmpty(this.insights)) {
            throw new UnexpectedResponseError("No insight recordings", 404, {});
        }

        /*
         * recorded backend treats both identifier and URI as ID; the value will be used to look up
         * insight in the recording index
         */
        const id = isIdentifierRef(ref) ? ref.identifier : ref.uri;
        const recordingId = recId(identifierToRecording(id));
        const recording = this.insights[recordingId];

        if (!recording) {
            throw new UnexpectedResponseError(`No insight with ID: ${id}`, 404, {});
        }

        return cloneDeep(recording.obj);
    }

    public async getInsights(query?: IInsightQueryOptions): Promise<IInsightQueryResult> {
        const { limit, offset, orderBy } = query ?? {};

        if (isEmpty(this.insights)) {
            return new RecordingPager<IInsight>([], limit, offset);
        }

        const insights = Object.values(this.insights).map(rec => cloneDeep(rec.obj));

        if (orderBy) {
            insights.sort(comparator(orderBy));
        }

        return new RecordingPager<IInsight>(insights, limit, offset);
    }

    public async updateInsight(insight: IInsight): Promise<IInsight> {
        const id = insightId(insight);
        const recordingId = recId(id);
        const existingRecording = this.insights[recordingId];

        if (!existingRecording) {
            throw new UnexpectedResponseError(`No insight with ID: ${id}`, 404, {});
        }

        existingRecording.obj = cloneDeep(insight);

        return existingRecording.obj;
    }

    public async deleteInsight(ref: ObjRef): Promise<void> {
        const id = isIdentifierRef(ref) ? ref.identifier : ref.uri;
        const recordingId = recId(id);

        if (!this.insights[recordingId]) {
            throw new UnexpectedResponseError(`No insight with ID: ${id}`, 404, {});
        }

        delete this.insights[recordingId];

        return;
    }
}

type Comparator = (a: IInsight, b: IInsight) => number;

const titleComparator: Comparator = (a, b): number => {
    return insightTitle(a).localeCompare(insightTitle(b));
};

const idComparator: Comparator = (a, b): number => {
    return insightId(a).localeCompare(insightId(b));
};

function comparator(orderBy: InsightOrdering): Comparator {
    if (orderBy === "title") {
        return titleComparator;
    }

    /*
     * note: ID comparator is used for both orderBy 'id' and 'updated'. That is because 'updated' is not yet
     * part of the IInsight so there's nothing to sort by.
     */
    return idComparator;
}

function recId(forId: string): string {
    return `i_${identifierToRecording(forId)}`;
}