Feature: Personal Details Onboarding

  @apiOnboarding
  Scenario: User completes onboarding successfully
    Given admin logs in
    When user do the registration
    And user submits personal details
    And user submits contact details
    And user submits account details for accountType "current"
    And user submits identity details
    And user submits source of income as "Salaried"
    And user "accept" declaration details
    And admin retrieves customers
    Then verify account is available in the customer account list
