// Method that transforms a color from hex representation to RBG
function hex_to_rgb(hex){

    var bigint = parseInt(hex, 16)
    var red = (bigint >> 16) & 255
    var green = (bigint >> 8) & 255
    var blue = bigint & 255

    return {
		red: red,
		blue: blue,
		green: green
	}
}

// Method that maps a number to a color
export function map_to_gradient(fadeFraction, first_color_hex, second_color_hex, third_color_hex){

	var first_color = hex_to_rgb(first_color_hex)
	var second_color = hex_to_rgb(second_color_hex)
	var fade = fadeFraction

	if (third_color_hex) {
		fade = fade * 2
		if (fade >= 1) {
			fade -= 1
			first_color = second_color
			second_color = hex_to_rgb(third_color_hex)
		}
	}

	var diff_red = second_color.red - first_color.red
	var diff_green = second_color.green - first_color.green
	var diff_blue = second_color.blue - first_color.blue

	var gradient = {
		red: parseInt(Math.floor(first_color.red + (diff_red * fade)), 10),
		green: parseInt(Math.floor(first_color.green + (diff_green * fade)), 10),
		blue: parseInt(Math.floor(first_color.blue + (diff_blue * fade)), 10),
	}

	return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')'

}