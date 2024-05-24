/* tslint:disable */
/* eslint-disable */
/**
 * Meetings Api
 * Online meetings between doctors and patients management for Web-In-Cloud system
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: leoentiev.oliver@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface MeetingsListEntry
 */
export interface MeetingsListEntry {
    /**
     * Unique id of the entry in this meetings list
     * @type {string}
     * @memberof MeetingsListEntry
     */
    'id': string;
    /**
     * Name of doctor for the meeting
     * @type {string}
     * @memberof MeetingsListEntry
     */
    'doctorName': string;
    /**
     * Name of patient for the meeting
     * @type {string}
     * @memberof MeetingsListEntry
     */
    'patientName': string;
    /**
     * Date when meeting will take place
     * @type {string}
     * @memberof MeetingsListEntry
     */
    'date': string;
    /**
     * Start time of meeting
     * @type {string}
     * @memberof MeetingsListEntry
     */
    'startTime': string;
    /**
     * End time of meeting
     * @type {string}
     * @memberof MeetingsListEntry
     */
    'endTime': string;
    /**
     * Whether meeting is important
     * @type {boolean}
     * @memberof MeetingsListEntry
     */
    'important': boolean;
}

/**
 * MeetingsListApi - axios parameter creator
 * @export
 */
export const MeetingsListApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * You get a list of online meetings
         * @summary Provides the online meetings list
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMeetingsList: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/meetings`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MeetingsListApi - functional programming interface
 * @export
 */
export const MeetingsListApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MeetingsListApiAxiosParamCreator(configuration)
    return {
        /**
         * You get a list of online meetings
         * @summary Provides the online meetings list
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMeetingsList(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MeetingsListEntry>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMeetingsList(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MeetingsListApi - factory interface
 * @export
 */
export const MeetingsListApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MeetingsListApiFp(configuration)
    return {
        /**
         * You get a list of online meetings
         * @summary Provides the online meetings list
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMeetingsList(options?: any): AxiosPromise<Array<MeetingsListEntry>> {
            return localVarFp.getMeetingsList(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MeetingsListApi - interface
 * @export
 * @interface MeetingsListApi
 */
export interface MeetingsListApiInterface {
    /**
     * You get a list of online meetings
     * @summary Provides the online meetings list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MeetingsListApiInterface
     */
    getMeetingsList(options?: AxiosRequestConfig): AxiosPromise<Array<MeetingsListEntry>>;

}

/**
 * MeetingsListApi - object-oriented interface
 * @export
 * @class MeetingsListApi
 * @extends {BaseAPI}
 */
export class MeetingsListApi extends BaseAPI implements MeetingsListApiInterface {
    /**
     * You get a list of online meetings
     * @summary Provides the online meetings list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MeetingsListApi
     */
    public getMeetingsList(options?: AxiosRequestConfig) {
        return MeetingsListApiFp(this.configuration).getMeetingsList(options).then((request) => request(this.axios, this.basePath));
    }
}


