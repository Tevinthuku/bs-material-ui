import * as Path from 'path';
import * as Fs from 'fs';

import Convert from '../../json-schema-parser/src_ts';
import outputDirectory from './output';

const RenderTheme = () => {
    const path = Path.resolve(outputDirectory, 'json');
    const themePath = Path.join(path, 'theme.json');
    const themeOptionsPath = Path.join(path, 'theme-options.json');

    const theme = Fs.readFileSync(themePath, 'utf-8');
    const themeOptions = Fs.readFileSync(themeOptionsPath, 'utf-8');

    const options = {
        replaceRefs: [
            {
                re: /CSSProperties$/m,
                replaceWith: 'ReactDOMRe.Style.t',
            },
            {
                re: /Partial.*([a-zA-Z]*)Props/m,
                replaceWith: 'Js.Json.t',
            },
            {
                re: /React\.>/m,
                replaceWith: 'Js.Json.t',
            },
            {
                re: /ComponentsProps/m,
                replaceWith: 'Js.Json.t',
            },
            {
                re: /HTML.*Element/m,
                replaceWith: 'ReasonReact.reactElement',
            },
        ],
        replaceKeys: [
            {
                re: /fontFamily/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /fontWeightLight/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /fontWeightMedium/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /fontWeightRegular/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /color/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /fontSize/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /fontWeight/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /letterSpacing/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /lineHeight/m,
                replaceWith: { type: 'string' },
            },
            {
                re: /textTransform/m,
                replaceWith: { type: 'string' },
            },
        ],
    };

    const themeConvert = Convert(theme, 'Theme', options);
    const themeOptionsConvert = Convert(themeOptions, 'ThemeOptions', options);

    return {
        theme: themeConvert ? themeConvert.refmt : '',
        themeOptions: themeOptionsConvert ? themeOptionsConvert.refmt : '',
    };
};

export default RenderTheme();