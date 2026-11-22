Feature: This feature will do the onboarding using API and do the login in UI using API data context

  @hybrid
  Scenario: Validate that user can be onboarded using API and do the login in UI using API data context
    Given admin logs in
    When I completes full onboarding for accountType "savings" with source of income "Salaried" and declaration "accept"
    Then I launch the url
    And I do the login using api data context in UI
    