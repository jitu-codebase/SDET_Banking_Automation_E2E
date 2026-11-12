Feature: Customer Management

  @getallcustomers
  Scenario: Admin retrieves customers successfully
    When admin logs in
    And admin retrieves customers
    # Then the customer list should be returned successfully
