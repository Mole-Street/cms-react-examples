#!/usr/bin/env zsh

# Function to create Azure function files
create_azure_function_files() {
    local azure_name
    local assets_dir="scripts/assets"
    local base_dir="backend/azure-functions"

    # Loop until the user provides a valid name
    while true; do
        # Prompt user for the Azure function name if not already passed as argument
        echo "Enter the Azure function name (kebab-case, e.g., 'shopping-cart'): "
        read azure_name

        # Trim any leading/trailing whitespace from the input
        azure_name=$(echo "$azure_name" | xargs)

        # Check if the azure_name is empty
        if [ -z "$azure_name" ]; then
            echo "🚫 The name cannot be empty. Please enter a valid name."

        # Check if the azure_name follows the 'kebab-case' format (lowercase and hyphens)
        elif ! [[ "$azure_name" =~ ^[a-z]+(-[a-z]+)*$ ]]; then
            echo "🚫 The name must be in kebab-case (e.g., 'test-test'). Please enter a valid name."

        # Check if the azure_name contains the word "azure" or "function" (case-insensitive)
        elif [[ "$azure_name" =~ [Aa]zure || "$azure_name" =~ [Ff]unction ]]; then
            echo "🚫 The name '$azure_name' cannot include the words 'azure' or 'function'. Please choose a different name."

        else
            project_dir="$base_dir/$azure_name"
            
            # Check if the directory already exists
            if [ -d "$project_dir" ]; then
                echo "🚫 The Azure function '$azure_name' already exists. Please choose a different name."
            else
                break  # Exit the loop if the name is valid, not empty, and the directory doesn't exist
            fi
        fi
    done

    # Create the project directory
    mkdir -p "$project_dir"

    # Create source files
    touch "$project_dir/index.js"
    cp -r "$assets_dir/backend/azure-function/setup/" "$project_dir/"

    # Replace placeholder with the function name in package.json
    sed -i '' "s/~replace_name~/$azure_name/g" "$project_dir/package.json"

    # Replace placeholder with the function name in README.md
    sed -i '' "s/~replace_name~/$azure_name/g" "$project_dir/README.md"

    echo "✅ Azure function '$azure_name' setup complete!"
}
