#!/usr/bin/env zsh

# Function to create a React App project
create_react_files() {
    local app_name
    local react_apps_dir="frontend/react-apps"
    local assets_dir="scripts/assets/frontend"
    local shared_assets_dir="scripts/assets/shared"

    # Loop until the user provides a valid name
    while true; do
        # Prompt user for the app name if not already passed as argument
        echo "Enter the React app name (kebab-case, e.g., 'test-function'): "
        read app_name


        # Trim any leading/trailing whitespace from the input
        app_name=$(echo "$app_name" | xargs)

        # Check if the app_name is empty
        if [ -z "$app_name" ]; then
            echo "🚫 The app name cannot be empty. Please enter a valid name."

        # Check if the app_name follows the 'kebab-case' format (lowercase and hyphens)
        elif ! [[ "$app_name" =~ ^[a-z]+(-[a-z]+)*$ ]]; then
            echo "🚫 The name must be in kebab-case (e.g., 'test-function'). Please enter a valid name."

        # Check if the app_name contains the word "react" or "app" (case-insensitive)
        elif [[ "$app_name" =~ [Rr]eact || "$app_name" =~ [Aa]pp ]]; then
            echo "🚫 The name '$app_name' cannot include the words 'react' or 'app'. Please choose a different name."

        else
            app_base_dir="$react_apps_dir/$app_name"

            # Check if the app directory already exists
            if [ -d "$app_base_dir" ]; then
                echo "🚫 The React app '$app_name' already exists in $react_apps_dir. Please choose a different name."
            else
                break  # Exit the loop if the name is valid, not empty, and the directory doesn't exist
            fi
        fi
    done

    # Ensure the react-apps directory exists
    mkdir -p "$react_apps_dir"

    # Define directories
    local project_dir="$app_base_dir/$app_name-project"
    local app_dir="$project_dir/$app_name-app"

    echo "ℹ️  Setting up React App: $app_name"

    # Create app directories
    mkdir -p "$project_dir"
    mkdir -p "$app_dir/components"

    # Copy assets to scaffold new CMS React project
    cp -r "$assets_dir/react-apps/components/" "$app_dir/components"
    cp -r "$assets_dir/react-apps/setup/" "$app_dir/"
    cp "$shared_assets_dir/.hsignore" "$project_dir/.hsignore"
    cp "$assets_dir/react-apps/hsproject.json" "$project_dir/hsproject.json"

    # Replace placeholders with app name in the copied files
    sed -i '' "s/~replace_name~/$app_name/g" "$app_dir/package.json"
    sed -i '' "s/~replace_name~/$app_name-project/g" "$project_dir/hsproject.json"
    sed -i '' "s/~replace_name~/$app_name - React/g" "$app_dir/cms-assets.json"
    sed -i '' "s/~replace_name~/$app_name/g" "$app_dir/README.md"

    echo "✅ React App setup complete!"
    echo "📂 Location: $app_dir"
}
