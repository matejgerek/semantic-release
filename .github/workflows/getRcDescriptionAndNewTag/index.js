const core = require("@actions/core");
const fs = require('fs');
const path = require('path')


const getRcDescriptionAndNewTagWithSemanticRelease = async () => {
    try {
        const semanticRelease = await import('semantic-release');
        const commitPartialHbs = fs.readFileSync(path.join(__dirname, './commitPartial.hbs'), 'utf8');
        const result = await semanticRelease.default({
            plugins: [
                ["@semantic-release/release-notes-generator", {
                    writerOpts: {
                        commitPartial: commitPartialHbs,
                        headerPartial: '',
                    }
                }],
                "@semantic-release/git"
                ],
        });

        if(!result) {
            return
        }


        // next release version of prerelease branch consists of {version}-{postfix}
        const newVersion = result.nextRelease.version.split('-')[0]

        core.setOutput('NEW_VERSION', newVersion);
        core.setOutput('NEW_CHANGES', result.nextRelease.notes);
    } catch (error) {
        console.log(error);
    }
}

getRcDescriptionAndNewTagWithSemanticRelease();

// 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