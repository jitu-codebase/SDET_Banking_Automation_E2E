Feature: Delete the User

  @apiDeleteUser
  Scenario: Validate that user can be deleted successfully
    Given admin logs in
    And admin retrieves customers
    When admin sends delete request for a user
