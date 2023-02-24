import {exec} from "child_process";
import {promisify} from "util";
import semanticRelease from "semantic-release";
import * as core from "@actions/core";

const execAsync = promisify(exec);

const getRcDescriptionAndNewTagWithSemanticRelease = async () => {
    try {
        const result = await semanticRelease({
            plugins: [
                "@semantic-release/release-notes-generator",
                "@semantic-release/git"
                ],
        },
        );

        console.log(result);
        core.setOutput('NEW_VERSION', result.nextRelease.version);
        core.setOutput('NEW_CHANGES', result.nextRelease.notes);
    } catch (error) {
        console.log(error);
    }
}

getRcDescriptionAndNewTagWithSemanticRelease();

// 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