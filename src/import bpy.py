import bpy

def create_custom_house(width=2, depth=2, height=2, roof_height=1, location=(0, 0,
0)):
    # Create the main cube for the house
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    house = bpy.context.active_object
    house.scale = (width / 2, depth / 2, height / 2)
    house.location = (location[0], location[1], location[2] + height / 2)
    house.name = "house"

    # Create the roof as a tiled roof
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    Roof = bpy.context.active_object
    Roof.scale = (width / 2, depth / 2, roof_height / 4)
    Roof.location = (location[0], location[1], location[2] + height + roof_height / 2)
    Roof.name = "Roof"
    # Create roof tiles
    bpy.ops.object.select_all(action='DESELECT')
    Roof.select_set(True)
    bpy.context.view_layer.objects.active = roof
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.subdivide(number_cuts=10)
    bpy.ops.object.mode_set(mode="OBJECT")
    # Create the door
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    Door = bpy.context.active_object
    Door.scale = (width / 6, depth / 20, height / 3)
    Door.location = (location[0], location[1] - depth / 2 + depth / 20, location[2] + height /
    3)
    Door.name = "Door"

    # Create two windows
    for i in range(2):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
        Window = bpy.context.active_object
        Window.scale = (width / 8, depth / 20, height / 4)
        Window.location = (location[0] - width / 4 + i * (width / 2), location[1] - depth / 2 +
        depth / 20, location[2] + 2 * height / 3)
        Window.name = f"Window{i+1}"

    # Create the chimney
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    Chimney = bpy.context.active_object
    Chimney.scale = (width / 10, depth / 10, height / 2)
    Chimney.location = (location[0] + width / 3, location[1] + depth / 4, location[2] + height
    + roof_height)
    Chimney.name = "Chimney" # Join all parts
    bpy.ops.object.select_all(action='DESELECT')
    house.select_set(True)
    Roof.select_set(True)
    Door.select_set(True)
    Chimney.select_set(True)
    for obj in bpy.context.scene.objects:
        if "Window" in obj.name:
            obj.select_set(True)
    bpy.context.view_layer.objects.active = house
    bpy.ops.object.join()
    # Move the house to a new collection
    bpy.ops.collection.create(name="CustomHouses")
    house_collection = bpy.data.collections['CustomHouses']
    bpy.ops.object.move_to_collection(collection_index=house_collection.index)
    # Example usage
create_custom_house(width=4, depth=3, height=3, roof_height=1.5, location=(2, 2, 0))