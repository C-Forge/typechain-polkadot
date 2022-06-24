/* eslint-disable indent */

import { decorateJsDoc, buildIndentedText } from './_utils';


////

// ARGUMENTS

export function FILE(
	argsTypes : {
		id : number | string;
		tsStr : string;
	}[],
	methods : {
		name : string;
		args : {
			name : string;
			type : {
				id : number | string;
				tsStr : string;
			};
		}[]
	}[],
) {
	//
	return `/* This file is auto-generated */

import type BN from 'bn.js';

export interface ArgumentsTypes {
${
	buildIndentedText(
		argsTypes.map(arg => `"${arg.id}" : ${arg.tsStr};`)
	)
}
}

export interface ArgumentsTuples {
${
	buildIndentedText(
		methods.map(m => `"${m.name}" : readonly [ ${ m.args.map(a => a.type.tsStr).join(', ') } ]`)
	)
}
}
`;
}

export function METHOD_JSDOC(labels : string[]) {
	if(labels.length < 1) return "	/** */\n";
	//
	return decorateJsDoc(labels.map(l => `@type ${l}`));
}

export const METHOD = (name : string, types : string[]) =>
`	"${name}" : readonly [ ${ types.join(', ') } ];
`;