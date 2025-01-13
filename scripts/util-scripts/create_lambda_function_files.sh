#!/usr/bin/env zsh

# Function to create Lambda function files
create_lambda_function_files() {
    local lambda_name
    local assets_dir="scripts/assets"
    local base_dir="backend/lambda-functions"

    # Loop until the user provides a valid name
    while true; do
        # Prompt user for the Lambda function name if not already passed as argument
        echo "Enter the Lambda function name (kebab-case, e.g., 'shopping-cart'): "
        read lambda_name
        
        # Trim any leading/trailing whitespace from the input
        lambda_name=$(echo "$lambda_name" | xargs)

        # Check if the lambda_name is empty
        if [ -z "$lambda_name" ]; then
            echo "🚫 The name cannot be empty. Please enter a valid name."

        # Check if the lambda_name follows the 'kebab-case' format (lowercase and hyphens)
        elif ! [[ "$lambda_name" =~ ^[a-z]+(-[a-z]+)*$ ]]; then
            echo "🚫 The name must be in kebab-case (e.g., 'test-function'). Please enter a valid name."

        # Check if the lambda_name contains the word "lambda" or "function" (case-insensitive)
        elif [[ "$lambda_name" =~ [Ll]ambda || "$lambda_name" =~ [Ff]unction ]]; then
            echo "🚫 The name '$lambda_name' cannot include the words 'lambda' or 'function'. Please choose a different name."

        else
            project_dir="$base_dir/$lambda_name"
            
            # Check if the directory already exists
            if [ -d "$project_dir" ]; then
                echo "🚫 The Lambda function '$lambda_name' already exists. Please choose a different name."
            else
                break  # Exit the loop if the name is valid, not empty, and the directory doesn't exist
            fi
        fi
    done

    # Create the project directory
    mkdir -p "$project_dir"

    # Create source file
    touch "$project_dir/index.js"

    # Copy necessary files from the assets directory
    cp -r "$assets_dir/backend/lambda-function/setup/" "$project_dir/"

    # Replace placeholder with the function name in package.json
    sed -i '' "s/~replace_name~/$lambda_name/g" "$project_dir/package.json"

    # Replace placeholder with the function name in README.md
    sed -i '' "s/~replace_name~/$lambda_name/g" "$project_dir/README.md"

    echo "✅ Lambda function '$lambda_name' setup complete!"
}
