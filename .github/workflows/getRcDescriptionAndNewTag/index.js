import semanticRelease from "semantic-release";
import * as core from "@actions/core";
import fs from 'fs';
import * as path from "path";



const commitPartial = fs.readSync(path.resolve(__dirname, 'commit.hbs'), 'utf-8');

const getRcDescriptionAndNewTagWithSemanticRelease = async () => {
    try {
        const result = await semanticRelease({
            plugins: [
                ["@semantic-release/release-notes-generator", {
                    writerOpts: {
                        commitPartial,
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