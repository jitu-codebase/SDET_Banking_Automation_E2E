Feature: Admin Login

  Scenario: Admin logs in with valid credentials
    When admin logs in
    Then the login should be successful
