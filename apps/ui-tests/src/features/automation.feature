@automationLab
Feature: This feature will do the onboarding using API and do the login in UI using API data context

  Background: Validate that user can be onboarded using API and do the login in UI using API data context
    Given admin logs in
    When I completes full onboarding for accountType "savings" with source of income "Salaried" and declaration "accept"
    Then I launch the url
    And I do the login using api data context in UI
    Then I land on "dashboard" page
    And I navigate to "Automation Lab" page from nav_menu
  
  Scenario: Validate fruits drop down functionality
    Then I select "banana" from fruits drop down

  Scenario: Validate radio buttons
    Then I select "Male" radio button

  Scenario: Validate check boxes
    Then I select "Terms" check box

  Scenario: Validate File Upload
    Then I upload file

  Scenario: Validate Submit Application in IFrame
    Then I fill full name "jitendra" and select role "tester" in iframe

  @alerts
  Scenario: Validate JavaScript Alerts
    Then I validate javascript "normal" alerts
    Then I validate javascript "confirm" alerts
    Then I validate javascript "prompt" alerts

  @newTab
  Scenario: Validate new window and pop up window
    Then I validate new tab
    Then I validate pop up window

  @multiTab
  Scenario: Validate multiple windows
    Then I fill form in new tab and then in parent tab
