from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import Template, PackageType, Dependencies, \
    RunTimeDeps, generate_template

template = Template(
    path=Path(__file__).parent,
    type=PackageType.Library,
    name="@youwol/os-top-banner",
    version="0.0.2-wip",
    shortDescription="Top banner & related components to use in YouWol applications.",
    author="greinisch@youwol.com",
    dependencies=Dependencies(
        runTime=RunTimeDeps(
            load={
                "@youwol/flux-view": "^0.1.1",
                "@youwol/os-core": "^0.0.6"
            }
        ),
        devTime={
            "@youwol/cdn-client": "^0.1.3",
            "@youwol/http-clients": "^0.1.9",
            "rxjs": "^6.5.5",
            "uuid": "^8.3.2"
        }
    ),
    userGuide=True
    )

generate_template(template)
