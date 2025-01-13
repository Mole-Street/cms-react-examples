#!/usr/bin/env zsh

#Dynamically resolve the path of the script and the util-scripts folder
UTIL_SCRIPTS_DIR="scripts/util-scripts"

# Source the necessary scripts with the correct absolute paths
source "$UTIL_SCRIPTS_DIR/create_react_files.sh"
source "$UTIL_SCRIPTS_DIR/create_theme_files.sh"
source "$UTIL_SCRIPTS_DIR/create_serverless_function_files.sh"
source "$UTIL_SCRIPTS_DIR/create_lambda_function_files.sh"
source "$UTIL_SCRIPTS_DIR/create_azure_function_files.sh"
source "$UTIL_SCRIPTS_DIR/create_ui_extension_files.sh"

# Main script logic
echo "Welcome to the Project Setup Script! 🚀"
echo "Please select the type of project to create:"
echo "1) Frontend"
echo "2) Backend"
echo "Enter your choice (1 or 2): "
read project_type  # Read project type
echo "Project type: $project_type"  # Debug line

if [ "$project_type" = "1" ]; then
    echo "Choose a frontend project type:"
    echo "1) Website"
    echo "2) Quotes"
    echo "3) Emails"
    echo "4) Membership-Portal"
    echo "5) Blog"
    echo "6) React App"
    echo "Enter your choice (1-6): "
    read project_choice  # Read project choice
    echo "Project choice: $project_choice" 

    case $project_choice in
        1) theme_name="website" ;;
        2) theme_name="quotes" ;;
        3) theme_name="emails" ;;
        4) theme_name="membership-portal" ;;
        5) theme_name="blog" ;;
        6)
            # Only handle the React App creation here
            create_react_files "$app_name"
            exit 0  # Exit the script after creating React App, no need to create theme files for React App
            ;;
        *)
            echo "🚫  Invalid choice. Please run the script again and select a valid option."
            exit 1
            ;;
    esac

    # Now create theme files only for theme-related projects
    create_theme_files "$theme_name"

elif [ "$project_type" = "2" ]; then
    echo "Choose a backend project type:"
    echo "1) HubSpot Serverless Function"
    echo "2) Lambda Function"
    echo "3) Azure Function"
    echo "4) HubSpot UI Extension"
    echo "Enter your choice (1, 2, 3, or 4): "
    read backend_choice  # Read backend choice
    echo "Backend choice: $backend_choice"  # Debug line

    case $backend_choice in
        1)
            # create_serverless_function_files handles name validation
            create_serverless_function_files 
            ;;
        

        2)
            # create_lambda_function_files handles name validation
            create_lambda_function_files  
            ;;

        3)
            # create_azure_function_files handles name validation
            create_azure_function_files 
            ;;

        4)
            # create_serverless_function_files handles name validation
            create_ui_extension_files 
            ;;

        *)
            echo "🚫  Invalid choice. Please run the script again and select a valid option."
            exit 1
            ;;
    esac

else
    echo "🚫  Invalid choice. Please run the script again and select a valid option."
    exit 1
fi
