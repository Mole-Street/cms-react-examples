#!/usr/bin/env zsh

# Function to create files for HS theme projects
create_theme_files() {
    local theme_name=$1
    local themes_dir="frontend/themes"
    local project_path="$themes_dir/$theme_name"
    local assets_dir="scripts/assets/frontend"
    local shared_assets_dir="scripts/assets/shared/"

    # Ensure themes directory exists
    mkdir -p "$themes_dir"

    # Check if the theme directory already exists
    if [ -d "$project_path" ]; then
        echo "🚫  The theme project '$theme_name' already exists at $project_path. No changes were made."
        return
    fi

    # Copy config files from the assets directory into the new project directory
    mkdir -p "$project_path/config" 
    cp -r "$assets_dir/themes/config/" "$project_path/config"

    # Copy HS theme src files from the assets directory into the new project directory
    mkdir -p "$project_path/src/"
    cp -r "$assets_dir/themes/src/" "$project_path/src"

    # Copy theme level files from the assets directory into the new project directory
    cp -r "$assets_dir/themes/setup/" "$project_path"
    cp -r "$shared_assets_dir" "$project_path/"

    # Replace the theme name in the README.md, package.json, & webpack.config.js files
    sed -i '' "s/~replace_name~/$theme_name/g" "$project_path/README.md"
    sed -i '' "s/~replace_name~/$theme_name/g" "$project_path/package.json"
    sed -i '' "s/~replace_name~/$theme_name/g" "$project_path/webpack.config.js"

    echo "✅ Theme project setup complete! Location: $project_path"
}
