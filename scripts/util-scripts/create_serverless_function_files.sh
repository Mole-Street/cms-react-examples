#!/usr/bin/env zsh

# Function to create a serverless function project
create_serverless_function_files() {
    local function_name
    local assets_dir="scripts/assets/backend"
    local base_dir="backend/serverless-functions"

    # Loop until the user provides a valid name
    while true; do
        # Prompt user for the function name in kebab-case
        echo "Enter the Serverless Function name (kebab-case, e.g., 'shopping-cart'): "
        read function_name

        # Trim any leading/trailing whitespace from the input
        function_name=$(echo "$function_name" | xargs)

        # Check if the function_name is empty
        if [ -z "$function_name" ]; then
            echo "🚫 The function name cannot be empty. Please enter a valid name."

        # Check if the function_name follows the 'kebab-case' format (lowercase and hyphens)
        elif ! [[ "$function_name" =~ ^[a-z]+(-[a-z]+)*$ ]]; then
            echo "🚫 The name must be in kebab-case (e.g., 'test-function'). Please enter a valid name."

        # Check if the function_name contains the word "serverless" or "function" (case-insensitive)
        elif [[ "$function_name" =~ [Ss]erverless || "$function_name" =~ [Ff]unction ]]; then
            echo "🚫 The name '$function_name' cannot include the words 'serverless' or 'function'. Please choose a different name."

        else
            project_dir="$base_dir/$function_name"

            # Check if the function directory already exists
            if [ -d "$project_dir" ]; then
                echo "🚫 The Serverless Function '$function_name' already exists in $base_dir/$function_name. Please choose a different name."
            else
                break  # Exit the loop if the name is valid, not empty, and the directory doesn't exist
            fi
        fi
    done

    # Prompt user for the HTTP method type with a selection menu
    while true; do
        echo "Select the HTTP method for the function:"
        PS3='Please enter the number corresponding to your choice: '
        select method_type in "GET" "POST" "DELETE" "PUT"; do
            case $method_type in
                GET|POST|DELETE|PUT)
                    break 2  # Exit both loops if a valid method is selected
                    ;;
                *)
                    echo "🚫 Invalid selection. Please choose 1 for GET, 2 for POST, 3 for DELETE, or 4 for PUT."
                    break  # Break out of the select loop to prompt again
                    ;;
            esac
        done
    done

    local project_dir="$base_dir/$function_name/$function_name.functions/"
    # Create the serverless function directory
    mkdir -p "$project_dir"

    # Create the function file & copy seed file contents
    touch "$project_dir/${function_name}.js"
    cat "$assets_dir/serverless-functions/fn.js" > "$project_dir/${function_name}.js"

    # Create the package.json file
    cp -r "$assets_dir/serverless-functions/setup/" "$project_dir/"

    # Replace placeholders with the function name in the copied files
    sed -i '' "s/~replace_name~/$function_name/g" "$project_dir/package.json"
    sed -i '' "s/~replace_name~/$function_name/g" "$project_dir/serverless.json"
    sed -i '' "s/~replace_name~/$function_name/g" "$project_dir/README.md"
    sed -i '' "s/~replace_method~/$method_type/g" "$project_dir/serverless.json"
    sed -i '' "s/~replace_method~/$method_type/g" "$project_dir/README.md"

    echo "✅ Serverless Function '$function_name' setup complete with method '$method_type'! Location: $project_dir"
}
