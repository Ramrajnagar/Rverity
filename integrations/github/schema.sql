-- GitHub Installations Table
-- Stores GitHub App installation data for each user

CREATE TABLE IF NOT EXISTS github_installations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    installation_id BIGINT NOT NULL UNIQUE,
    account_login TEXT NOT NULL,
    account_type TEXT NOT NULL, -- 'User' or 'Organization'
    access_token TEXT NOT NULL,
    token_type TEXT NOT NULL,
    scope TEXT,
    installed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT github_installations_user_installation_unique UNIQUE (user_id, installation_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_github_installations_user_id ON github_installations(user_id);
CREATE INDEX IF NOT EXISTS idx_github_installations_installation_id ON github_installations(installation_id);

-- Enable Row Level Security
ALTER TABLE github_installations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own installations"
    ON github_installations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own installations"
    ON github_installations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own installations"
    ON github_installations FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own installations"
    ON github_installations FOR DELETE
    USING (auth.uid() = user_id);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_github_installations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER github_installations_updated_at
    BEFORE UPDATE ON github_installations
    FOR EACH ROW
    EXECUTE FUNCTION update_github_installations_updated_at();

-- Comments
COMMENT ON TABLE github_installations IS 'Stores GitHub App installation data for users';
COMMENT ON COLUMN github_installations.installation_id IS 'GitHub installation ID';
COMMENT ON COLUMN github_installations.account_login IS 'GitHub account username or org name';
COMMENT ON COLUMN github_installations.account_type IS 'User or Organization';
COMMENT ON COLUMN github_installations.access_token IS 'OAuth access token';
