export class ConfigurationReader {
    privatestaticgetEnvironmentVariableOrError
}

(variable: string): string {
    const value = process.env[variable];
    if (!value || value.trim() === '') {
      throw new Error(`Required environment variable '${variable}' is not set or is blank`);
    }
    return value;
  }

  private static getEnvironmentVariableOrDefault(variable: string, defaultValue: string): string {
    const value = process.env[variable];
    return (!value || value.trim() === '') ? defaultValue : value;
  }

  // URL Configuration
  static getOrchestratorUrl(): string {
    return this.getEnvironmentVariableOrError('ORCHESTRATOR_STUB_URL');
  }

  static getIdentityBuildUrl(): string {
    return this.getEnvironmentVariableOrDefault(
      'IDENTITY_BUILD_URL',
      'https://identity.build.account.gov.uk'
    );
  }

  static getTicfManagementUrl(): string {
    return this.getEnvironmentVariableOrDefault(
      'TICF_MANAGEMENT_URL',
      'https://ticf.stubs.account.gov.uk/management/user'
    );
  }

  // API Keys
  static getTicfApiKey(): string {
    return this.getEnvironmentVariableOrError('TICF_MANAGEMENT_API_KEY');
  }

  // Feature Flags
  static getFeatureFlagsUrl(): string {
    const baseUrl = this.getIdentityBuildUrl();
    const featureSet = this.getEnvironmentVariableOrDefault(
      'FEATURE_FLAGS',Collapse commentComment on line R43DanCorderIPV commented on Sep 24, 2025 DanCorderIPVon Sep 24, 2025ContributorMore actionsI don't think this makes sense as an environment variable - we'll want different flags per testsReact👍React with 👍1aleemriazaleemriaz replied on Sep 24, 2025 aleemriazon Sep 24, 2025ContributorAuthorMore actionsYeah you’re right. This is just a POC for this specific test. Once we start adding more tests, we can parameterise this variable so each test can pass in the feature flags it needs.ReactWrite a replyResolve comment
      'ticfCriBeta,disableStrategicApp'
    );
    return `${baseUrl}/ipv/usefeatureset?featureSet=${featureSet}`;
  }

  // Browser Configuration
  static getBrowser(): string {
    return this.getEnvironmentVariableOrDefault('BROWSER', 'chromium');
  }

  // Test Configuration
  static getTestTimeout(): number {
    const timeout = process.env['TEST_TIMEOUT'];
    return timeout ? parseInt(timeout, 10) : 90000;
  }

  static isHeadless(): boolean {
    return this.getEnvironmentVariableOrDefault('HEADLESS', 'true').toLowerCase() === 'true';
  }

  static getBaseUrl(): string {
    return this.getEnvironmentVariableOrDefault('BASE_URL', this.getIdentityBuildUrl());
  }
}

// Convenience constant for accessing configuration
export const CONFIG = {
  URLS: {
    ORCHESTRATOR_STUB: ConfigurationReader.getOrchestratorUrl(),
    IDENTITY_BUILD: ConfigurationReader.getIdentityBuildUrl(),
    TICF_MANAGEMENT_API: ConfigurationReader.getTicfManagementUrl(),
  },
  API: {
    TICF_API_KEY: ConfigurationReader.getTicfApiKey(),
  },
  FEATURE_FLAGS: {
    ENABLE_URL: ConfigurationReader.getFeatureFlagsUrl(),
},
  BROWSER: {
    TYPE: ConfigurationReader.getBrowser(),
    HEADLESS: ConfigurationReader.isHeadless(),
    TIMEOUT: ConfigurationReader.getTestTimeout(),
  },
} as const;