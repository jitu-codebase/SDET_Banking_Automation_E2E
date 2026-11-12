Feature: Onboarding

  @uiOnboarding
  Scenario Outline: Customer Onboarding
    Given I launch the url
    When I click on open account button
    And I fill the email address
    And I fill the personal details
    And I fill the contact details
    And I fill account details for accountType "Savings Account"
    And I fill identity details
    And I select source of income as "Salaried"
    And I accept declaration
    Then I verify account is created successfully
    # When I login with stored customer details

    Examples:
      | accountType     |
      | Savings Account |
      | Current Account |
