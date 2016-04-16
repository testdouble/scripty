def wait_for_file(name)
  while !File.exist?(File.join(File.dirname(__FILE__), name))
    sleep 0.1
  end
end

def write_file(name)
  File.open(File.join(File.dirname(__FILE__), name), 'w') {|f| f.write('stuff') }
end

puts "Batter waits for ball"
wait_for_file('ball')
puts "Batter sees ball"
write_file('bat')
puts "Batter writes bat"
