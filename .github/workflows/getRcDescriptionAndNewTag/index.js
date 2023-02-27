const core = require("@actions/core");
const fs = require('fs');

const getRcDescriptionAndNewTagWithSemanticRelease = async () => {
    try {
        const semanticRelease = await import('semantic-release');
        const commitPartialHbs = fs.readFileSync('./commitPartial.hbs', 'utf8');
        const result = await semanticRelease.default({
            plugins: [
                ["@semantic-release/release-notes-generator", {
                    writerOpts: {
                        commitPartial: commitPartialHbs,
                    }
                }],
                "@semantic-release/git"
                ],
        },
        );

        console.log('semantic-release output test',result);
        core.setOutput('NEW_VERSION', result.nextRelease.version);
        core.setOutput('NEW_CHANGES', result.nextRelease.notes);
    } catch (error) {
        console.log(error);
    }
}

getRcDescriptionAndNewTagWithSemanticRelease();

// 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