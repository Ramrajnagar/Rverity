import crypto from 'crypto';

export interface GitHubWebhookPayload {
    action?: string;
    repository?: {
        name: string;
        full_name: string;
        owner: {
            login: string;
        };
    };
    sender?: {
        login: string;
    };
    [key: string]: any;
}

export class GitHubWebhookVerifier {
    constructor(private secret: string) { }

    verify(payload: string, signature: string): boolean {
        if (!signature) return false;

        const hmac = crypto.createHmac('sha256', this.secret);
        const digest = 'sha256=' + hmac.update(payload).digest('hex');

        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(digest)
        );
    }
}

export class GitHubEventProcessor {
    static processPushEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const commits = payload.commits || [];
        const repo = payload.repository?.full_name || 'unknown';
        const branch = payload.ref?.replace('refs/heads/', '') || 'unknown';
        const pusher = payload.pusher?.name || payload.sender?.login || 'unknown';

        const commitMessages = commits.map((c: any) => c.message).join('; ');
        const filesChanged = commits.reduce((acc: number, c: any) =>
            acc + (c.added?.length || 0) + (c.modified?.length || 0) + (c.removed?.length || 0), 0
        );

        return {
            content: `Pushed ${commits.length} commit(s) to ${repo}/${branch}: ${commitMessages}`,
            tags: ['github', 'push', 'commit', branch],
            metadata: {
                repository: repo,
                branch,
                pusher,
                commits: commits.length,
                filesChanged,
                commitShas: commits.map((c: any) => c.id),
                url: payload.compare
            }
        };
    }

    static processPullRequestEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const pr = payload.pull_request;
        const action = payload.action;
        const repo = payload.repository?.full_name || 'unknown';
        const author = pr.user?.login || 'unknown';

        return {
            content: `${action} PR #${pr.number} in ${repo}: ${pr.title}`,
            tags: ['github', 'pull-request', action, pr.state],
            metadata: {
                repository: repo,
                prNumber: pr.number,
                title: pr.title,
                author,
                action,
                state: pr.state,
                baseBranch: pr.base?.ref,
                headBranch: pr.head?.ref,
                additions: pr.additions,
                deletions: pr.deletions,
                changedFiles: pr.changed_files,
                url: pr.html_url
            }
        };
    }

    static processIssueEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const issue = payload.issue;
        const action = payload.action;
        const repo = payload.repository?.full_name || 'unknown';
        const author = issue.user?.login || 'unknown';

        return {
            content: `${action} issue #${issue.number} in ${repo}: ${issue.title}`,
            tags: ['github', 'issue', action, issue.state],
            metadata: {
                repository: repo,
                issueNumber: issue.number,
                title: issue.title,
                author,
                action,
                state: issue.state,
                labels: issue.labels?.map((l: any) => l.name) || [],
                url: issue.html_url
            }
        };
    }

    static processIssueCommentEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const issue = payload.issue;
        const comment = payload.comment;
        const repo = payload.repository?.full_name || 'unknown';
        const author = comment.user?.login || 'unknown';

        return {
            content: `Commented on issue #${issue.number} in ${repo}: ${comment.body?.substring(0, 100)}...`,
            tags: ['github', 'comment', 'issue'],
            metadata: {
                repository: repo,
                issueNumber: issue.number,
                issueTitle: issue.title,
                author,
                commentBody: comment.body,
                url: comment.html_url
            }
        };
    }

    static processPullRequestReviewEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const pr = payload.pull_request;
        const review = payload.review;
        const repo = payload.repository?.full_name || 'unknown';
        const reviewer = review.user?.login || 'unknown';

        return {
            content: `${review.state} review on PR #${pr.number} in ${repo}`,
            tags: ['github', 'review', 'pull-request', review.state.toLowerCase()],
            metadata: {
                repository: repo,
                prNumber: pr.number,
                prTitle: pr.title,
                reviewer,
                state: review.state,
                body: review.body,
                url: review.html_url
            }
        };
    }

    static processReleaseEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const release = payload.release;
        const repo = payload.repository?.full_name || 'unknown';
        const author = release.author?.login || 'unknown';

        return {
            content: `Released ${release.tag_name} in ${repo}: ${release.name}`,
            tags: ['github', 'release', payload.action],
            metadata: {
                repository: repo,
                tagName: release.tag_name,
                name: release.name,
                author,
                prerelease: release.prerelease,
                draft: release.draft,
                body: release.body,
                url: release.html_url
            }
        };
    }

    static processCreateEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const refType = payload.ref_type;
        const ref = payload.ref;
        const repo = payload.repository?.full_name || 'unknown';
        const sender = payload.sender?.login || 'unknown';

        return {
            content: `Created ${refType} '${ref}' in ${repo}`,
            tags: ['github', 'create', refType],
            metadata: {
                repository: repo,
                refType,
                ref,
                sender,
                description: payload.description
            }
        };
    }

    static processDeleteEvent(payload: any): {
        content: string;
        tags: string[];
        metadata: Record<string, any>;
    } {
        const refType = payload.ref_type;
        const ref = payload.ref;
        const repo = payload.repository?.full_name || 'unknown';
        const sender = payload.sender?.login || 'unknown';

        return {
            content: `Deleted ${refType} '${ref}' in ${repo}`,
            tags: ['github', 'delete', refType],
            metadata: {
                repository: repo,
                refType,
                ref,
                sender
            }
        };
    }
}

export function getEventProcessor(eventType: string): ((payload: any) => {
    content: string;
    tags: string[];
    metadata: Record<string, any>;
}) | null {
    const processors: Record<string, any> = {
        'push': GitHubEventProcessor.processPushEvent,
        'pull_request': GitHubEventProcessor.processPullRequestEvent,
        'issues': GitHubEventProcessor.processIssueEvent,
        'issue_comment': GitHubEventProcessor.processIssueCommentEvent,
        'pull_request_review': GitHubEventProcessor.processPullRequestReviewEvent,
        'release': GitHubEventProcessor.processReleaseEvent,
        'create': GitHubEventProcessor.processCreateEvent,
        'delete': GitHubEventProcessor.processDeleteEvent,
    };

    return processors[eventType] || null;
}
