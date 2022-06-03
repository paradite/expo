import fs from 'fs-extra';
import path from 'path';

import { EXPO_DIR } from '../../Constants';
import logger from '../../Logger';
import { getListOfPackagesAsync, Package } from '../../Packages';
import { filterAsync } from '../../Utils';
import { ReviewInput, ReviewOutput, ReviewStatus } from '../types';

export default async function ({ pullRequest, diff }: ReviewInput): Promise<ReviewOutput | null> {
  if (!pullRequest.head) {
    logger.warn('Detached PR, we cannot asses the needed changelog entries!', pullRequest);
    return null;
  }

  const allPackages = await getListOfPackagesAsync();
  const modifiedPackages = allPackages.filter((pkg) => {
    return diff.some((fileDiff) => !path.relative(pkg.path, fileDiff.path).startsWith('../'));
  });

  const pkgsWithoutChangelogChanges = await filterAsync(modifiedPackages, async (pkg) => {
    const pkgHasChangelog = await fs.pathExists(pkg.changelogPath);
    return pkgHasChangelog && diff.every((fileDiff) => fileDiff.path !== pkg.changelogPath);
  });

  if (pkgsWithoutChangelogChanges.length === 0) {
    return null;
  }

  const changelogLinks = pkgsWithoutChangelogChanges
    .map((pkg) => `- ${relativeChangelogPath(pullRequest.head, pkg)}`)
    .join('\n');

  return {
    status: ReviewStatus.WARN,
    title: 'Missing changelog entries',
    body:
      'Your changes should be noted in the changelog. ' +
      'Read [Updating Changelogs](https://github.com/expo/expo/blob/main/guides/contributing/Updating%20Changelogs.md) ' +
      `guide and consider adding an appropriate entry to the following changelogs: \n${changelogLinks}`,
  };
}

function relativeChangelogPath(head: ReviewInput['pullRequest']['head'], pkg: Package): string {
  const relativePath = path.relative(EXPO_DIR, pkg.changelogPath);
  return `[\`${relativePath}\`](${head.repo?.html_url}/blob/${head.ref}/${relativePath})`;
}
