#!/usr/bin/env zsh

create_ui_extension_serverless_function_files() {
    # Accept ui_extension_name as an argument
    local ui_extension_name=$1
    local base_dir="backend/ui-extensions/$ui_extension_name/src/app/app.functions"
    local assets_dir="scripts/assets/backend"

    # Prompt the user if they need a serverless function for this UI extension
    echo "Do you need a Serverless Function for this UI extension? (y/n): "
    read create_function

    if [[ "$create_function" =~ ^[Yy]$ ]]; then
        # Loop until the user provides a valid name for the serverless function
        while true; do
            # Prompt user for the function name
            echo "Enter the Serverless Function name (kebab-case, e.g., 'test-function'): "
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
                function_dir="$base_dir/$function_name.js"

                # Check if the function directory already exists
                if [ -d "$function_dir" ]; then
                    echo "🚫 The Serverless Function '$function_name' already exists in $function_dir. Please choose a different name."
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

        mkdir -p "$base_dir"

        # Create the serverless function file and copy seed content
        cat "$assets_dir/serverless-functions/fn.js" > "$base_dir/$function_name.js"

        # Create package.json 
        cp "$assets_dir/ui-extension/src/app/app.functions/package.json" "$base_dir/package.json"
        sed -i '' "s/~replace_name~/$ui_extension_name/g" "$base_dir/package.json"

        # Create README.md 
        cp "$assets_dir/ui-extension/src/app/app.functions/README.md" "$base_dir/README.md"
        sed -i '' "s/~replace_fn_name~/$function_name/g" "$base_dir/README.md"
        sed -i '' "s/~replace_name~/$ui_extension_name/g" "$base_dir/README.md"
        sed -i '' "s/~replace_method~/$method_type/g" "$base_dir/README.md"

        # Create serverless.json 
        cp "$assets_dir/ui-extension/src/app/app.functions/serverless.json" "$base_dir/serverless.json"
        sed -i '' "s/~replace_name~/$function_name/g" "$base_dir/serverless.json"
        sed -i '' "s/~replace_method~/$method_type/g" "$base_dir/serverless.json"  # Add method type to serverless.json

        echo "✅ Serverless Function '$function_name' setup complete with method '$method_type'! Location: $base_dir"
    else
        # If the user selects no, do not create any files
        echo "No Serverless Function will be created for this UI extension."
    fi
}
