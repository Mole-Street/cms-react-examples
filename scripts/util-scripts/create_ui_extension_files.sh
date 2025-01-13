#!/usr/bin/env zsh

UTIL_SCRIPTS_DIR="scripts/util-scripts"
source "$UTIL_SCRIPTS_DIR/create_ui_extension_serverless_function_files.sh"

# Function to convert kebab-case to PascalCase (macOS-compatible)
convert_to_pascal_case() {
    local kebab_case=$1
    local pascal_case="${kebab_case//-/ }"  # Replace hyphens with spaces
    pascal_case="${(C)pascal_case}"         # Title case each word
    pascal_case="${pascal_case// /}"        # Remove spaces to smoosh together

    # Return the result in PascalCase
    echo "$pascal_case"
}

# Function to create a UI Extension project
create_ui_extension_files() {
    local ui_extension_name
    local assets_dir="scripts/assets/backend"
    local base_dir="backend/ui-extensions"
    
    # Prompt the user for the UI extension name in kebab-case (lowercase with dashes)
    while true; do
        # Prompt user for the extension name
        echo "Enter the UI Extension name (kebab-case, e.g., 'test-test'): "
        read ui_extension_name

        # Trim any leading/trailing whitespace from the input
        ui_extension_name=$(echo "$ui_extension_name" | xargs)

        # Check if the UI extension name is empty
        if [ -z "$ui_extension_name" ]; then
            echo "🚫 The UI extension name cannot be empty. Please enter a valid name."

        # Check if the name follows the 'kebab-case' format (lowercase and dashes)
        elif ! [[ "$ui_extension_name" =~ ^[a-z]+(-[a-z]+)*$ ]]; then
            echo "🚫 The UI extension name must be in kebab-case (e.g., 'test-test'). Please enter a valid name."

        # Check if the name contains "ui" or "extension" (case-insensitive)
        elif [[ "$ui_extension_name" =~ -ui || "$ui_extension_name" =~ ui-  || "$ui_extension_name" =~ [Ee]xtension ]]; then
            echo "🚫 The UI extension name cannot contain the words 'ui' or 'extension'. Please choose a different name."

        else
            project_dir="$base_dir/$ui_extension_name"

            # Check if the UI extension directory already exists
            if [ -d "$project_dir" ]; then
                echo "🚫 The UI extension '$ui_extension_name' already exists in $base_dir/$ui_extension_name. Please choose a different name."
            else
                break  # Exit the loop if the name is valid, not empty, and the directory doesn't exist
            fi
        fi
    done

    # Convert kebab-case name to PascalCase
    local pascal_case_name=$(convert_to_pascal_case "$ui_extension_name")

    local project_dir="$base_dir/$ui_extension_name"
    # Create the UI extension directory
    mkdir -p "$project_dir"

    # Create project files
    cp -r "$assets_dir/ui-extension/setup/" "$project_dir/"
    cp -r "$assets_dir/ui-extension/src/" "$project_dir/src"
    # note: this could be better—in a perfect world, the copying in the lines above should be more fine-tuned so this removal isn't necessary
    rm -rf "$project_dir/src/app/app.functions/"
    

    # Ensure PascalCase variable is correctly expanded
    mv "$project_dir/src/app/extensions/card.json" "$project_dir/src/app/extensions/${ui_extension_name}-card.json"
    mv "$project_dir/src/app/extensions/Card.jsx" "$project_dir/src/app/extensions/${pascal_case_name}.jsx"


    # Replace placeholders with the UI extension name in the copied files
    sed -i '' "s/~replace_name~/$ui_extension_name/g" "$project_dir/hsproject.json"
    sed -i '' "s/~replace_name~/$ui_extension_name/g" "$project_dir/README.md"
    sed -i '' "s/~replace_name~/$ui_extension_name/g" "$project_dir/src/app/app.json"
    sed -i '' "s/~replace_name~/$ui_extension_name/g" "$project_dir/src/app/extensions/package.json"
    sed -i '' "s/~replace_name~/$ui_extension_name/g" "$project_dir/src/app/extensions/${ui_extension_name}-card.json"
    sed -i '' "s/~replace_react_name~/$pascal_case_name/g" "$project_dir/src/app/extensions/${ui_extension_name}-card.json"
    sed -i '' "s/REPLACE_NAME/$pascal_case_name/g" "$project_dir/src/app/extensions/${pascal_case_name}.jsx"

    echo "✅ UI Extension '$ui_extension_name' setup complete! Location: $project_dir"

    # Call the create_ui_extension_serverless_function_files function
    create_ui_extension_serverless_function_files "$ui_extension_name"
}
