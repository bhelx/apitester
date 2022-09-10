require "application_system_test_case"

class EndpointsTest < ApplicationSystemTestCase
  setup do
    @endpoint = endpoints(:one)
  end

  test "visiting the index" do
    visit endpoints_url
    assert_selector "h1", text: "Endpoints"
  end

  test "should create endpoint" do
    visit endpoints_url
    click_on "New endpoint"

    fill_in "Name", with: @endpoint.name
    fill_in "Source code", with: @endpoint.source_code
    click_on "Create Endpoint"

    assert_text "Endpoint was successfully created"
    click_on "Back"
  end

  test "should update Endpoint" do
    visit endpoint_url(@endpoint)
    click_on "Edit this endpoint", match: :first

    fill_in "Name", with: @endpoint.name
    fill_in "Source code", with: @endpoint.source_code
    click_on "Update Endpoint"

    assert_text "Endpoint was successfully updated"
    click_on "Back"
  end

  test "should destroy Endpoint" do
    visit endpoint_url(@endpoint)
    click_on "Destroy this endpoint", match: :first

    assert_text "Endpoint was successfully destroyed"
  end
end
