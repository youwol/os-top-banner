
const runTimeDependencies = {
    "externals": {
        "@youwol/os-core": "^0.2.0",
        "@youwol/rx-vdom": "^1.0.1"
    },
    "includedInBundle": {}
}
const externals = {
    "@youwol/os-core": {
        "commonjs": "@youwol/os-core",
        "commonjs2": "@youwol/os-core",
        "root": "@youwol/os-core_APIv02"
    },
    "@youwol/rx-vdom": {
        "commonjs": "@youwol/rx-vdom",
        "commonjs2": "@youwol/rx-vdom",
        "root": "@youwol/rx-vdom_APIv1"
    }
}
const exportedSymbols = {
    "@youwol/os-core": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/os-core"
    },
    "@youwol/rx-vdom": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/rx-vdom"
    }
}

const mainEntry : {entryFile: string,loadDependencies:string[]} = {
    "entryFile": "./index.ts",
    "loadDependencies": [
        "@youwol/rx-vdom",
        "@youwol/os-core"
    ]
}

const secondaryEntries : {[k:string]:{entryFile: string, name: string, loadDependencies:string[]}}= {}

const entries = {
     '@youwol/os-top-banner': './index.ts',
    ...Object.values(secondaryEntries).reduce( (acc,e) => ({...acc, [`@youwol/os-top-banner/${e.name}`]:e.entryFile}), {})
}
export const setup = {
    name:'@youwol/os-top-banner',
        assetId:'QHlvdXdvbC9vcy10b3AtYmFubmVy',
    version:'0.2.1-wip',
    shortDescription:"Top banner & related components to use in YouWol applications.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/os-top-banner&tab=doc',
    npmPackage:'https://www.npmjs.com/package/@youwol/os-top-banner',
    sourceGithub:'https://github.com/youwol/os-top-banner',
    userGuide:'https://l.youwol.com/doc/@youwol/os-top-banner',
    apiVersion:'02',
    runTimeDependencies,
    externals,
    exportedSymbols,
    entries,
    secondaryEntries,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    },

    installMainModule: ({cdnClient, installParameters}:{
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const parameters = installParameters || {}
        const scripts = parameters.scripts || []
        const modules = [
            ...(parameters.modules || []),
            ...mainEntry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/os-top-banner_APIv02`]
        })
    },
    installAuxiliaryModule: ({name, cdnClient, installParameters}:{
        name: string,
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const entry = secondaryEntries[name]
        if(!entry){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const parameters = installParameters || {}
        const scripts = [
            ...(parameters.scripts || []),
            `@youwol/os-top-banner#0.2.1-wip~dist/@youwol/os-top-banner/${entry.name}.js`
        ]
        const modules = [
            ...(parameters.modules || []),
            ...entry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/os-top-banner/${entry.name}_APIv02`]
        })
    },
    getCdnDependencies(name?: string){
        if(name && !secondaryEntries[name]){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const deps = name ? secondaryEntries[name].loadDependencies : mainEntry.loadDependencies

        return deps.map( d => `${d}#${runTimeDependencies.externals[d]}`)
    }
}
