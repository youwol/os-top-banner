
const runTimeDependencies = {
    "load": {
        "@youwol/flux-view": "^1.0.3",
        "@youwol/os-core": "^0.1.1"
    },
    "differed": {},
    "includedInBundle": []
}
const externals = {
    "@youwol/flux-view": {
        "commonjs": "@youwol/flux-view",
        "commonjs2": "@youwol/flux-view",
        "root": "@youwol/flux-view_APIv1"
    },
    "@youwol/os-core": {
        "commonjs": "@youwol/os-core",
        "commonjs2": "@youwol/os-core",
        "root": "@youwol/os-core_APIv01"
    }
}
const exportedSymbols = {
    "@youwol/flux-view": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/flux-view"
    },
    "@youwol/os-core": {
        "apiKey": "01",
        "exportedSymbol": "@youwol/os-core"
    }
}
export const setup = {
    name:'@youwol/os-top-banner',
        assetId:'QHlvdXdvbC9vcy10b3AtYmFubmVy',
    version:'0.1.1',
    shortDescription:"Top banner & related components to use in YouWol applications.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/os-top-banner',
    npmPackage:'https://www.npmjs.com/package/@youwol/os-top-banner',
    sourceGithub:'https://github.com/youwol/os-top-banner',
    userGuide:'https://l.youwol.com/doc/@youwol/os-top-banner',
    apiVersion:'01',
    runTimeDependencies,
    externals,
    exportedSymbols,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    }
}
